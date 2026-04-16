<template>
  <div v-if="rawMode" style="font-family: sans-serif; padding: 40px; text-align: center;">
    <h2>FHIR Spec Diff Viewer</h2>
    <div style="max-width: 400px; margin: 10px auto; font-size: 0.85em; color: #666; text-align: left;">
      <p style="text-align: center;">{{ rawStatus }}</p>
      <div v-if="rawProgressOld || rawProgressNew">
        <div style="margin-bottom: 4px;">Old: {{ formatBytes(rawProgressOld) }}</div>
        <div>New: {{ formatBytes(rawProgressNew) }}</div>
      </div>
    </div>
    <v-progress-linear v-if="!rawError" indeterminate color="primary" style="max-width: 400px; margin: 20px auto;" />
    <p v-if="rawError" style="color: red;">{{ rawError }}</p>
  </div>
  <div v-else class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px">
      <br />
      <p class="leader">
        FHIR Spec Diff Viewer
      </p>
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
  background-image: url('/fhir-lab-ico-300x300.png');
  background-position: center;
  background-attachment: fixed;
  opacity: 0.2;
  z-index: -1;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

useHead({
  title: 'FHIR Spec Diff Viewer - FHIRPath Lab'
})

const route = useRoute()
const router = useRouter()

const downloaderPrefix = 'https://fhirpath-lab-dotnet2.azurewebsites.net/api/downloader?url='

// Reactive state
const rawMode = ref(false)
const rawStatus = ref('')
const rawError = ref('')
const rawProgressOld = ref(0)
const rawProgressNew = ref(0)

// Form inputs (shown when no query params)
const oldUrl = ref('https://build.fhir.org/ig/HL7/FHIRPath/index.html')
const newUrl = ref('https://build.fhir.org/ig/HL7/FHIRPath/branches/BP-2026-03-quantity-preview/index.html')

// Internal state for raw mode
const oldSpecHtml = ref('')
const newSpecHtml = ref('')
const activeNewUrl = ref('')

// Methods
function formatBytes(bytes: number): string {
  if (!bytes) return '0 B'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function startCompare() {
  router.push({ path: '/htmldiff', query: { old: oldUrl.value, new: newUrl.value } })
  downloadAndCompare(oldUrl.value, newUrl.value)
}

function wrapWithProxy(url: string): string {
  if (url.startsWith('http://build.fhir.org/') || url.startsWith('http://hl7.org/fhir/'))
    url = 'https://' + url.substring(7)

  if (url.startsWith('https://build.fhir.org/') || url.startsWith('https://github.com/HL7/') || url.startsWith('https://hl7.org/fhir/'))
    url = downloaderPrefix + url

  return url
}

function getBaseUrl(url: string): string {
  if (url.startsWith(downloaderPrefix)) {
    url = url.substring(downloaderPrefix.length)
  }
  return url.substring(0, url.lastIndexOf('/') + 1)
}

function rebaseHeadUrls(html: string, baseUrl: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  doc.head.querySelectorAll('[href], [src]').forEach(el => {
    for (const attr of ['href', 'src']) {
      const val = el.getAttribute(attr)
      if (val && !/^(https?:\/\/|\/\/|data:|#|mailto:)/i.test(val)) {
        el.setAttribute(attr, baseUrl + val)
      }
    }
  })

  return doc.head.innerHTML
}

function rebaseBodySrcUrls(html: string, baseUrl: string): string {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  tempDiv.querySelectorAll('[src]').forEach(el => {
    const val = el.getAttribute('src')
    if (val && !/^(https?:\/\/|\/\/|data:|#|mailto:)/i.test(val)) {
      el.setAttribute('src', baseUrl + val)
    }
  })
  return tempDiv.innerHTML
}

function extractBody(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return match ? match[1] : html
}

function executeDiffInWorker(oldHtml: string, newHtml: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('../workers/htmldiff.worker.ts', import.meta.url),
      { type: 'module' }
    )
    worker.onmessage = (e: MessageEvent<string>) => {
      resolve(e.data)
      worker.terminate()
    }
    worker.onerror = (e) => {
      reject(new Error(e.message))
      worker.terminate()
    }
    worker.postMessage({ oldHtml, newHtml })
  })
}

async function comparePages() {
  const oldHtml = extractBody(oldSpecHtml.value)
  const newHtml = extractBody(newSpecHtml.value)

  try {
    rawStatus.value = 'Computing diff...'
    const val = await executeDiffInWorker(oldHtml, newHtml)
    renderRawDiff(val, activeNewUrl.value)
  } catch (e) {
    console.error(e)
    rawError.value = 'Diff computation failed: ' + (e as Error).message
  }
}

function renderRawDiff(diffHtml: string, newPageUrl: string) {
  const baseUrl = getBaseUrl(newPageUrl)

  const headContent = rebaseHeadUrls(newSpecHtml.value, baseUrl)
  diffHtml = rebaseBodySrcUrls(diffHtml, baseUrl)

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
  padding: 8px 10px 8px 8px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.15);
  font-family: sans-serif;
  font-size: 13px;
}
#diff-nav button {
  padding: 6px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
  font-size: 16px;
  width: 100%;
}
#diff-nav button:hover { background: #e0e0e0; }
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
  <button onclick="diffNavPrev()" title="Previous change  ( &lt; or , )">&#9650;</button>
  <div class="diff-pos"><input type="text" class="diff-counter" id="diff-counter" value="0" /><span class="diff-total" id="diff-total"></span></div>
  <button onclick="diffNavNext()" title="Next change  ( &gt; or . )">&#9660;</button>
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

  function highlight(idx) {
    if (currentIdx >= 0 && currentIdx < diffs.length)
      diffs[currentIdx].classList.remove('diff-current-highlight');
    currentIdx = idx;
    if (currentIdx >= 0 && currentIdx < diffs.length) {
      var el = diffs[currentIdx];
      el.classList.add('diff-current-highlight');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      counter.value = String(currentIdx + 1);
    }
  }

  counter.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var num = parseInt(counter.value, 10);
      if (!isNaN(num) && num >= 1 && num <= diffs.length) {
        highlight(num - 1);
      } else {
        counter.value = currentIdx >= 0 ? String(currentIdx + 1) : '0';
      }
      counter.blur();
    }
  });

  window.diffNavNext = function() {
    if (diffs.length === 0) return;
    highlight(currentIdx < diffs.length - 1 ? currentIdx + 1 : 0);
  };
  window.diffNavPrev = function() {
    if (diffs.length === 0) return;
    highlight(currentIdx > 0 ? currentIdx - 1 : diffs.length - 1);
  };

  document.addEventListener('keydown', function(e) {
    // Skip when typing in the counter input
    if (e.target === counter) return;
    if (e.key === '>' || e.key === '.' || e.key === ']') { diffNavNext(); e.preventDefault(); }
    if (e.key === '<' || e.key === ',' || e.key === '[') { diffNavPrev(); e.preventDefault(); }
  });
});
<\/script>
</body>
</html>`

  document.open()
  document.write(fullHtml)
  document.close()
}

function downloadAndCompare(oldPageUrl: string, newPageUrl: string) {
  rawMode.value = true
  rawStatus.value = 'Downloading pages...'
  rawError.value = ''
  rawProgressOld.value = 0
  rawProgressNew.value = 0
  activeNewUrl.value = newPageUrl

  const proxiedOld = wrapWithProxy(oldPageUrl)
  const proxiedNew = wrapWithProxy(newPageUrl)

  Promise.all([
    axios.get(proxiedOld, {
      onDownloadProgress: (e) => { rawProgressOld.value = e.loaded }
    }),
    axios.get(proxiedNew, {
      onDownloadProgress: (e) => { rawProgressNew.value = e.loaded }
    }),
  ]).then(([oldResponse, newResponse]) => {
    oldSpecHtml.value = oldResponse.data
    newSpecHtml.value = newResponse.data
    return comparePages()
  }).catch(error => {
    console.error('Error in raw compare:', error)
    rawError.value = 'Failed to download pages: ' + error.message
  })
}

// Raw mode: auto-download and compare when old/new query params are present
onMounted(() => {
  const qOld = route.query.old as string
  const qNew = route.query.new as string
  if (qOld && qNew) {
    downloadAndCompare(qOld, qNew)
  }
})
</script>
