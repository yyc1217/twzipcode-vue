import 'should'
import { describe, it, beforeAll, afterAll } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath, URL as NodeURL } from 'node:url'
import { createBrowser, waitFor } from './jsdom-env.js'

// Smoke-test the BUILT demo site (docs/) that GitHub Pages serves. Catches
// regressions that only surface in the browser bundle: runtime template
// compilation of the in-DOM template, bundled locale data, and the event
// callback. Run `yarn build:demo` first.
const docsDir = fileURLToPath(new NodeURL('../../docs/', import.meta.url))
const indexHtml = docsDir + 'index.html'

describe('demo site smoke', () => {
  let browser
  let html

  beforeAll(function () {
    if (!existsSync(indexHtml)) {
      throw new Error('docs/index.html missing — run `yarn build:demo` before the smoke tests')
    }
    html = readFileSync(indexHtml, 'utf8')
  })

  afterAll(() => browser && browser.cleanup())

  it('mounts and renders all selects with options', async () => {
    browser = createBrowser(html)
    const jsFile = html.match(/assets\/(index-[^"]+\.js)/)[1]
    await import(docsDir + 'assets/' + jsFile)

    await waitFor(() => browser.document.querySelectorAll('#app select option').length > 100)

    const options = browser.document.querySelectorAll('#app select option')
    // 8 demo selects across counties / zipcodes / groupby
    options.length.should.be.above(3000)
  })

  it('updates the event callback when the zipcode select changes', async () => {
    const d = browser.document
    const select = d.querySelector('#twzipcode__zipcode--7')
    const output = d.querySelector('#demoCallback')
    output.textContent.trim().should.equal('')

    const option = select.querySelectorAll('option')[4]
    select.value = option.value
    select.dispatchEvent(new browser.window.Event('change'))

    await waitFor(() => output.textContent.trim() === option.value)
    output.textContent.trim().should.equal(option.value)
  })
})
