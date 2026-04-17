<template>
  <div
    v-if="rawMode"
    style="font-family: sans-serif; padding: 40px; text-align: center"
  >
    <h2>FHIR Spec Diff Viewer</h2>
    <div
      style="
        max-width: 400px;
        margin: 10px auto;
        font-size: 0.85em;
        color: #666;
        text-align: left;
      "
    >
      <p style="text-align: center">{{ rawStatus }}</p>
      <div v-if="rawProgressOld || rawProgressNew">
        <div style="margin-bottom: 4px">
          Old: {{ formatBytes(rawProgressOld) }}
        </div>
        <div>New: {{ formatBytes(rawProgressNew) }}</div>
      </div>
    </div>
    <v-progress-linear
      v-if="!rawError && !rawErrorOld && !rawErrorNew"
      indeterminate
      color="primary"
      style="max-width: 400px; margin: 20px auto"
    />
    <div
      v-if="rawErrorOld || rawErrorNew"
      style="
        max-width: 500px;
        margin: 10px auto;
        text-align: left;
        word-break: break-all;
      "
    >
      <p v-if="rawErrorOld" style="color: red">
        <strong>Old:</strong> {{ rawErrorOld }}
      </p>
      <p v-if="rawErrorNew" style="color: red">
        <strong>New:</strong> {{ rawErrorNew }}
      </p>
    </div>
    <p v-if="rawError" style="color: red">{{ rawError }}</p>
  </div>
  <div v-else class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px">
      <br />
      <p class="leader">FHIR Spec Diff Viewer</p>
      <br />
      <div>
        <v-text-field density="compact" label="Old Page URL" v-model="oldUrl" />
        <v-text-field density="compact" label="New Page URL" v-model="newUrl" />
        <v-btn @click="startCompare" :disabled="!oldUrl || !newUrl">
          <v-icon> mdi-file-compare </v-icon> Compare
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style>
.diffins {
  background-color: #b6ffa7;
}

.diffmod {
  background-color: #a7e0ff;
}

del.diffmod {
  background-color: #feccbf;
}

ins.diffmod {
  background-color: #b6ffa7;
}

.diffdel {
  background-color: #feccbf;
}
</style>

<style lang="scss" scoped>
.leader {
  font-size: x-large;
}

p {
  text-align: justify;
  text-justify: inter-word;
}

.main::before {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url("/fhir-lab-ico-300x300.png");
  background-position: center;
  background-attachment: fixed;
  opacity: 0.2;
  z-index: -1;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

useHead({
  title: "FHIR Spec Diff Viewer - FHIRPath Lab",
});

const route = useRoute();
const router = useRouter();

const downloaderPrefix =
  "https://fhirpath-lab-dotnet2.azurewebsites.net/api/downloader?url=";

// Reactive state
const rawMode = ref(false);
const rawStatus = ref("");
const rawError = ref("");
const rawErrorOld = ref("");
const rawErrorNew = ref("");
const rawProgressOld = ref(0);
const rawProgressNew = ref(0);

// Form inputs (shown when no query params)
const oldUrl = ref("https://build.fhir.org/ig/HL7/FHIRPath/index.html");
const newUrl = ref(
  "https://build.fhir.org/ig/HL7/FHIRPath/branches/BP-2026-03-quantity-preview/index.html"
);

// Internal state for raw mode
const oldSpecHtml = ref("");
const newSpecHtml = ref("");
const activeOldUrl = ref("");
const activeNewUrl = ref("");

// Methods
function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function startCompare() {
  router.push({
    path: "/htmldiff",
    query: { old: oldUrl.value, new: newUrl.value },
  });
  downloadAndCompare(oldUrl.value, newUrl.value);
}

function wrapWithProxy(url: string): string {
  if (url.startsWith("http://hl7.org/fhir/"))
    url = "https://" + url.substring(7);

  if (url.startsWith('https://github.com/HL7/') || url.startsWith('https://hl7.org/fhir/'))
    url = downloaderPrefix + url;

  return url;
}

function getBaseUrl(url: string): string {
  if (url.startsWith(downloaderPrefix)) {
    url = url.substring(downloaderPrefix.length);
  }
  // If the last path segment has no extension, treat it as a directory
  const lastSlash = url.lastIndexOf("/");
  const lastSegment = url.substring(lastSlash + 1);
  if (!lastSegment || lastSegment.indexOf(".") === -1) {
    return url.endsWith("/") ? url : url + "/";
  }
  return url.substring(0, lastSlash + 1);
}

function rebaseHeadUrls(html: string, baseUrl: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.head.querySelectorAll("[href], [src]").forEach((el) => {
    for (const attr of ["href", "src"]) {
      const val = el.getAttribute(attr);
      if (val && !/^(https?:\/\/|\/\/|data:|#|mailto:)/i.test(val)) {
        el.setAttribute(attr, baseUrl + val);
      }
    }
  });

  return doc.head.innerHTML;
}

function rebaseBodySrcUrls(html: string, baseUrl: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  tempDiv.querySelectorAll("[src]").forEach((el) => {
    const val = el.getAttribute("src");
    if (val && !/^(https?:\/\/|\/\/|data:|#|mailto:)/i.test(val)) {
      el.setAttribute("src", baseUrl + val);
    }
  });
  return tempDiv.innerHTML;
}

function extractBody(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : html;
}

function executeDiffInWorker(
  oldHtml: string,
  newHtml: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("../workers/htmldiff.worker.ts", import.meta.url),
      { type: "module" }
    );
    worker.onmessage = (e: MessageEvent<string>) => {
      resolve(e.data);
      worker.terminate();
    };
    worker.onerror = (e) => {
      reject(new Error(e.message));
      worker.terminate();
    };
    worker.postMessage({ oldHtml, newHtml });
  });
}

async function comparePages() {
  const oldHtml = extractBody(oldSpecHtml.value);
  const newHtml = extractBody(newSpecHtml.value);

  try {
    rawStatus.value = "Computing diff...";
    const val = await executeDiffInWorker(oldHtml, newHtml);
    renderRawDiff(val, activeOldUrl.value, activeNewUrl.value);
  } catch (e) {
    console.error(e);
    rawError.value = "Diff computation failed: " + (e as Error).message;
  }
}

function rewriteRelativeLinks(
  html: string,
  oldBaseUrl: string,
  newBaseUrl: string
): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const diffPagePath = window.location.pathname;
  tempDiv.querySelectorAll("a[href]").forEach((el) => {
    const href = el.getAttribute("href");
    if (!href) return;
    // Skip absolute, anchor-only, mailto, data, javascript links
    if (/^(https?:\/\/|\/\/|#|mailto:|data:|javascript:)/i.test(href)) return;
    // Skip non-page resources
    if (
      /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|json|xml|zip|pdf)$/i.test(
        href
      )
    )
      return;
    // Strip any fragment for URL resolution, preserve it for display
    const [path, fragment] = href.split("#");
    if (!path) return; // anchor-only like #foo was already skipped, but just in case
    try {
      const newTarget = new URL(path, newBaseUrl).href;
      const oldTarget = new URL(path, oldBaseUrl).href;
      const diffUrl =
        diffPagePath +
        "?old=" +
        encodeURIComponent(oldTarget) +
        "&new=" +
        encodeURIComponent(newTarget);
      el.setAttribute("href", diffUrl + (fragment ? "#" + fragment : ""));
    } catch (_) {
      // If URL resolution fails, leave link as-is
    }
  });
  return tempDiv.innerHTML;
}

function renderRawDiff(
  diffHtml: string,
  oldPageUrl: string,
  newPageUrl: string
) {
  const newBaseUrl = getBaseUrl(newPageUrl);
  const oldBaseUrl = getBaseUrl(oldPageUrl);

  const headContent = rebaseHeadUrls(newSpecHtml.value, newBaseUrl);
  diffHtml = rebaseBodySrcUrls(diffHtml, newBaseUrl);
  diffHtml = rewriteRelativeLinks(diffHtml, oldBaseUrl, newBaseUrl);

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
${headContent}
<style>
.diffins { background-color: #b6ffa7; }
.diffmod { background-color: #a7e0ff; }
del.diffmod { background-color: #feccbf; }
ins.diffmod { background-color: #b6ffa7; }
.diffdel { background-color: #feccbf; }
.diff-current-highlight { outline: 3px solid #ff6600; outline-offset: 2px; }
#diff-nav {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: white;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 8px 8px 0;
  padding: 6px 8px 6px 6px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.15);
  font-family: sans-serif;
  font-size: 13px;
}
#diff-nav button {
  padding: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #f5f5f5;
  font-size: 14px;
  line-height: 28px;
  text-align: center;
  border-radius: 0;
}
#diff-nav button:hover { background: #e0e0e0; }
#diff-nav .diff-row button:first-child { border-radius: 4px 0 0 4px; }
#diff-nav .diff-row button:last-child { border-radius: 0 4px 4px 0; border-left: none; }
#diff-nav .diff-row {
  display: flex;
  width: 100%;
}
#diff-nav .diff-pos {
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
  font-size: 12px;
  color: #666;
}
#diff-nav .diff-counter {
  text-align: right;
  width: 24px;
  border: none;
  padding: 0;
  outline: none;
  font-family: inherit;
  font-size: 12px;
  color: #666;
  background: transparent;
}
#diff-nav .diff-total { font-size: 12px; color: #999; }
</style>
</head>
<body>
<div id="diff-nav">
  <div class="diff-row">
    <button onclick="diffNavPrev()" title="Previous change ( , )">&#x2191;</button>
    <button onclick="diffNavPrevSection()" title="Skip to previous off-screen change ( < )">&#x21D1;</button>
  </div>
  <div class="diff-pos"><input type="text" class="diff-counter" id="diff-counter" value="0" /><span class="diff-total" id="diff-total"></span></div>
  <div class="diff-row">
    <button onclick="diffNavNext()" title="Next change ( . )">&#x2193;</button>
    <button onclick="diffNavNextSection()" title="Skip to next off-screen change ( > )">&#x21D3;</button>
  </div>
</div>
${diffHtml}
<script>
window.addEventListener('load', function() {
  var allDiffs = [];
  document.querySelectorAll('.diffins, .diffmod, .diffdel, ins.diffmod, del.diffmod').forEach(function(el) {
    // Skip tiny whitespace-only diffs
    if (el.textContent.trim().length === 0 && !el.querySelector('img')) return;
    allDiffs.push(el);
  });
  // Keep only leaf-level diffs (elements that don't contain other diff elements)
  var diffs = allDiffs.filter(function(el) {
    return !allDiffs.some(function(other) {
      return other !== el && el.contains(other);
    });
  });
  var currentIdx = -1;
  var counter = document.getElementById('diff-counter');
  var total = document.getElementById('diff-total');
  counter.value = '0';
  total.textContent = '/' + diffs.length;

  function highlight(idx, scroll) {
    if (currentIdx >= 0 && currentIdx < diffs.length)
      diffs[currentIdx].classList.remove('diff-current-highlight');
    currentIdx = idx;
    if (currentIdx >= 0 && currentIdx < diffs.length) {
      var el = diffs[currentIdx];
      el.classList.add('diff-current-highlight');
      if (scroll !== false && !isInViewport(el))
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      counter.value = String(currentIdx + 1);
    }
  }

  // Track scroll position and sync counter to first visible diff
  var scrollTimer = null;
  var navTriggeredScroll = false;

  function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function onUserScroll() {
    if (navTriggeredScroll) return;
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      // If current highlight is still visible, do nothing
      if (currentIdx >= 0 && currentIdx < diffs.length && isInViewport(diffs[currentIdx])) return;
      // Find first visible diff using binary search for performance with 1600+ diffs
      var lo = 0, hi = diffs.length - 1, firstVisible = -1;
      while (lo <= hi) {
        var mid = (lo + hi) >> 1;
        var rect = diffs[mid].getBoundingClientRect();
        if (rect.top >= window.innerHeight) {
          hi = mid - 1;
        } else if (rect.bottom <= 0) {
          lo = mid + 1;
        } else {
          firstVisible = mid;
          hi = mid - 1;
        }
      }
      if (firstVisible >= 0 && firstVisible !== currentIdx) {
        highlight(firstVisible, false);
      }
    }, 150);
  }

  window.addEventListener('scroll', onUserScroll, { passive: true });

  counter.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var num = parseInt(counter.value, 10);
      if (!isNaN(num) && num >= 1 && num <= diffs.length) {
        navTriggeredScroll = true;
        highlight(num - 1);
        setTimeout(function() { navTriggeredScroll = false; }, 500);
      } else {
        counter.value = currentIdx >= 0 ? String(currentIdx + 1) : '0';
      }
      counter.blur();
    }
  });

  window.diffNavNext = function() {
    if (diffs.length === 0) return;
    navTriggeredScroll = true;
    highlight(currentIdx < diffs.length - 1 ? currentIdx + 1 : 0);
    setTimeout(function() { navTriggeredScroll = false; }, 500);
  };
  window.diffNavPrev = function() {
    if (diffs.length === 0) return;
    navTriggeredScroll = true;
    highlight(currentIdx > 0 ? currentIdx - 1 : diffs.length - 1);
    setTimeout(function() { navTriggeredScroll = false; }, 500);
  };
  window.diffNavNextSection = function() {
    if (diffs.length === 0) return;
    for (var i = currentIdx + 1; i < diffs.length; i++) {
      if (!isInViewport(diffs[i])) {
        navTriggeredScroll = true;
        highlight(i);
        setTimeout(function() { navTriggeredScroll = false; }, 500);
        return;
      }
    }
  };
  window.diffNavPrevSection = function() {
    if (diffs.length === 0) return;
    for (var i = (currentIdx >= 0 ? currentIdx : diffs.length) - 1; i >= 0; i--) {
      if (!isInViewport(diffs[i])) {
        navTriggeredScroll = true;
        highlight(i);
        setTimeout(function() { navTriggeredScroll = false; }, 500);
        return;
      }
    }
  };

  document.addEventListener('keydown', function(e) {
    // Skip when typing in the counter input
    if (e.target === counter) return;
    if (e.key === '>') { diffNavNextSection(); e.preventDefault(); }
    else if (e.key === '<') { diffNavPrevSection(); e.preventDefault(); }
    else if (e.key === '.' || e.key === ']') { diffNavNext(); e.preventDefault(); }
    else if (e.key === ',' || e.key === '[') { diffNavPrev(); e.preventDefault(); }
  });
});
<\/script>
</body>
</html>`;

  document.open();
  document.write(fullHtml);
  document.close();
}

function formatDownloadError(error: any, url: string): string {
  if (error.response) {
    const status = error.response.status;
    const statusText = error.response.statusText || "";
    const data =
      typeof error.response.data === "string"
        ? error.response.data.substring(0, 200)
        : "";
    return `${url} — ${status} ${statusText}${data ? ": " + data : ""}`;
  }
  return `${url} — ${error.message || "Unknown error"}`;
}

function resolvedUrl(
  response: any,
  originalUrl: string,
  usedProxy: boolean
): string {
  if (usedProxy) return originalUrl;
  const finalUrl = response.request?.responseURL;
  if (!finalUrl) return originalUrl;
  return finalUrl;
}

function downloadAndCompare(oldPageUrl: string, newPageUrl: string) {
  rawMode.value = true;
  rawStatus.value = "Downloading pages...";
  rawError.value = "";
  rawErrorOld.value = "";
  rawErrorNew.value = "";
  rawProgressOld.value = 0;
  rawProgressNew.value = 0;
  activeOldUrl.value = oldPageUrl; // fallback, updated after download with resolved URL
  activeNewUrl.value = newPageUrl;

  const proxiedOld = wrapWithProxy(oldPageUrl);
  const proxiedNew = wrapWithProxy(newPageUrl);
  const oldUsedProxy = proxiedOld !== oldPageUrl;
  const newUsedProxy = proxiedNew !== newPageUrl;

  const noCacheHeaders = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  };

  const fetchOld = axios
    .get(proxiedOld, {
      headers: noCacheHeaders,
      onDownloadProgress: (e) => {
        rawProgressOld.value = e.loaded;
      },
    })
    .catch((error) => {
      rawErrorOld.value = formatDownloadError(error, oldPageUrl);
      return null;
    });

  const fetchNew = axios
    .get(proxiedNew, {
      headers: noCacheHeaders,
      onDownloadProgress: (e) => {
        rawProgressNew.value = e.loaded;
      },
    })
    .catch((error) => {
      rawErrorNew.value = formatDownloadError(error, newPageUrl);
      return null;
    });

  Promise.all([fetchOld, fetchNew]).then(([oldResponse, newResponse]) => {
    if (!oldResponse || !newResponse) return;
    activeOldUrl.value = resolvedUrl(oldResponse, oldPageUrl, oldUsedProxy);
    activeNewUrl.value = resolvedUrl(newResponse, newPageUrl, newUsedProxy);
    oldSpecHtml.value = oldResponse.data;
    newSpecHtml.value = newResponse.data;
    return comparePages();
  });
}

// Raw mode: auto-download and compare when old/new query params are present
onMounted(() => {
  const qOld = route.query.old as string;
  const qNew = route.query.new as string;
  if (qOld && qNew) {
    downloadAndCompare(qOld, qNew);
  }
});
</script>
