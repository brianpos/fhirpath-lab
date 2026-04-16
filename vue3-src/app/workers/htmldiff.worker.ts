import HtmlDiff from 'htmldiff-js';

self.onmessage = (e: MessageEvent<{ oldHtml: string; newHtml: string }>) => {
  const { oldHtml, newHtml } = e.data;
  const result = HtmlDiff.execute(oldHtml, newHtml);
  self.postMessage(result);
};
