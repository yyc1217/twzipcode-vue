import should from 'should'
import { describe, it, beforeAll, afterAll } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createBrowser, waitFor } from './jsdom-env.js'

// Smoke-test the BUILT library (dist/) rather than src/, so packaging-level
// regressions are caught: bundler config, twzipcode-data dynamic require,
// vue externalization and the named-export shape. Run `yarn build` first.
const distEs = fileURLToPath(new URL('../../dist/twzipcode.es.js', import.meta.url))

describe('library build smoke', () => {
  let browser

  beforeAll(function () {
    if (!existsSync(distEs)) {
      throw new Error('dist/twzipcode.es.js missing — run `yarn build` before the smoke tests')
    }
    browser = createBrowser()
  })

  afterAll(() => browser && browser.cleanup())

  it('exposes the named component exports', async () => {
    const lib = await import(distEs)
    should(lib).have.properties(['County', 'Zipcode', 'ZipcodeGroupby', 'install'])
  })

  it('renders county options from bundled data (dynamic require works)', async () => {
    const [{ createApp, h }, lib] = await Promise.all([
      import('vue'),
      import(distEs)
    ])
    const host = browser.document.createElement('div')
    browser.document.body.appendChild(host)

    createApp({ render: () => h(lib.County) }).mount(host)
    await waitFor(() => host.querySelectorAll('option').length > 0)

    const options = host.querySelectorAll('option')
    options.length.should.equal(22)
    options[0].textContent.trim().should.equal('臺北市')
  })

  it('does not inline Vue into the ES bundle (kept external)', () => {
    const code = readFileSync(distEs, 'utf8')
    code.should.match(/from"vue"|from "vue"/)
  })
})
