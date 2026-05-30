import { JSDOM } from 'jsdom'

// Browser globals that Vue 3's runtime touches during mount. jsdom provides
// them on its window, but they are not on Node's global scope by default.
const BROWSER_GLOBALS = [
  'window', 'document', 'navigator',
  'MutationObserver', 'requestAnimationFrame', 'cancelAnimationFrame',
  'Node', 'Element', 'HTMLElement', 'SVGElement', 'Text', 'Comment',
  'getComputedStyle', 'Event', 'CustomEvent'
]

/**
 * Create a fresh jsdom document and expose the browser globals that the
 * built bundles expect, so we can execute the *built* (Rollup) output the
 * same way a browser would. Returns the jsdom window plus a cleanup fn.
 */
export function createBrowser (html = '<!DOCTYPE html><html><body></body></html>', url = 'http://localhost/') {
  const dom = new JSDOM(html, { url, pretendToBeVisual: true, runScripts: 'outside-only' })
  const saved = {}
  for (const key of BROWSER_GLOBALS) {
    saved[key] = Object.getOwnPropertyDescriptor(globalThis, key)
    const value = dom.window[key]
    if (value !== undefined) {
      try {
        globalThis[key] = value
      } catch {
        // some globals (e.g. navigator) only have a getter; skip them
      }
    }
  }
  const cleanup = () => {
    for (const key of BROWSER_GLOBALS) {
      if (saved[key]) Object.defineProperty(globalThis, key, saved[key])
      else delete globalThis[key]
    }
    dom.window.close()
  }
  return { dom, window: dom.window, document: dom.window.document, cleanup }
}

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

/** Wait until `predicate()` is truthy or a timeout elapses. */
export async function waitFor (predicate, { timeout = 1000, interval = 10 } = {}) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    if (predicate()) return true
    await flush()
    await new Promise(resolve => setTimeout(resolve, interval))
  }
  return predicate()
}
