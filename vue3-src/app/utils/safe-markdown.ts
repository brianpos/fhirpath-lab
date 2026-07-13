import { marked } from 'marked'

const allowedTags = new Set([
  'a', 'b', 'blockquote', 'br', 'code', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'hr', 'i', 'li', 'ol', 'p', 'pre', 'strong', 'table', 'tbody', 'td', 'th', 'thead',
  'tr', 'ul',
])

function safeLink(value: string): boolean {
  const normalized = value.trim().toLowerCase()
  return normalized.startsWith('http://')
    || normalized.startsWith('https://')
    || normalized.startsWith('mailto:')
    || normalized.startsWith('/')
    || normalized.startsWith('#')
}

export function renderSafeMarkdown(value?: string): string {
  if (!value) return ''
  const rendered = marked.parse(value)
  if (typeof rendered !== 'string') return ''
  if (typeof DOMParser === 'undefined') {
    return rendered.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  }

  const document = new DOMParser().parseFromString(rendered, 'text/html')
  for (const element of Array.from(document.body.querySelectorAll('*'))) {
    if (!allowedTags.has(element.tagName.toLowerCase())) {
      element.replaceWith(document.createTextNode(element.textContent ?? ''))
      continue
    }

    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase()
      const isAllowedLinkAttribute = element.tagName.toLowerCase() === 'a'
        && (name === 'href' || name === 'title')
      if (!isAllowedLinkAttribute) element.removeAttribute(attribute.name)
    }

    if (element.tagName.toLowerCase() === 'a') {
      const href = element.getAttribute('href')
      if (!href || !safeLink(href)) {
        element.removeAttribute('href')
      } else if (href.startsWith('http://') || href.startsWith('https://')) {
        element.setAttribute('target', '_blank')
        element.setAttribute('rel', 'noopener noreferrer')
      }
    }
  }
  return document.body.innerHTML
}
