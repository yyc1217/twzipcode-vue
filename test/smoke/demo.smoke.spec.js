import should from 'should'
import { describe, it, beforeAll, afterAll } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath, URL as NodeURL } from 'node:url'
import { createBrowser, waitFor } from './jsdom-env.js'

// Smoke-test the BUILT demo site (docs/) that GitHub Pages serves. Catches
// regressions that only surface in the browser bundle: runtime template
// compilation of the in-DOM template, bundled locale data, the event
// callback, and every documented example rendering its expected output.
// Run `yarn build:demo` first.
const docsDir = fileURLToPath(new NodeURL('../../docs/', import.meta.url))
const indexHtml = docsDir + 'index.html'

// Each demo example on the page, by its element id, with the output it is
// expected to render. Keeps the smoke test aligned with what the docs claim.
const EXAMPLES = [
  {
    name: '所有郵遞區號 (custom text-template)',
    id: 'twzipcode__zipcode--1',
    options: 371,
    firstText: '100 臺北市-中正區',
    firstValue: '100'
  },
  {
    name: '以縣市分組',
    id: 'twzipcode__zipcode--2',
    options: 371,
    optgroups: 22,
    firstText: '中正區',
    firstValue: '100',
    firstOptgroup: '臺北市'
  },
  {
    name: '縣市',
    id: 'twzipcode__county--3',
    options: 22,
    firstText: '臺北市',
    firstValue: '臺北市'
  },
  {
    name: '樣式 - county',
    id: 'twzipcode__county--4',
    options: 22,
    firstText: '臺北市',
    firstValue: '臺北市'
  },
  {
    name: '樣式 - groupby',
    id: 'twzipcode__zipcode--groupby--4',
    options: 371,
    optgroups: 22,
    firstText: '中正區',
    firstValue: '100',
    firstOptgroup: '臺北市'
  },
  {
    name: '樣式 - zipcode',
    id: 'twzipcode__zipcode--4',
    options: 371,
    firstText: '100 臺北市 中正區',
    firstValue: '100'
  },
  {
    name: 'value與text格式 (model-value + custom templates)',
    id: 'twzipcode__zipcode--5',
    options: 371,
    firstText: '100 臺北市中正區',
    firstValue: '臺北市中正區',
    selected: '臺北市信義區'
  },
  {
    name: '英語 - county',
    id: 'twzipcode__county--6',
    options: 22,
    firstText: 'Taipei City',
    firstValue: '臺北市'
  },
  {
    name: '英語 - groupby',
    id: 'twzipcode__zipcode--groupby--6',
    options: 371,
    optgroups: 22,
    firstText: 'Zhongzheng District',
    firstValue: '100',
    firstOptgroup: 'Taipei City'
  },
  {
    name: '英語 - zipcode (mixed template)',
    id: 'twzipcode__zipcode--6',
    options: 371,
    firstText: '100 Taipei City / Zhongzheng District',
    firstValue: '100'
  },
  {
    name: '事件',
    id: 'twzipcode__zipcode--7',
    options: 371,
    firstText: '100 臺北市 中正區',
    firstValue: '100'
  },
  {
    name: '依縣市篩選 - county (v-model 臺中市)',
    id: 'twzipcode__county--8',
    options: 22,
    firstText: '臺北市',
    firstValue: '臺北市',
    selected: '臺中市'
  },
  {
    name: '依縣市篩選 - zipcode (filtered to 臺中市)',
    id: 'twzipcode__zipcode--8',
    options: 29,
    firstText: '400 臺中市 中區',
    firstValue: '400',
    selected: '400'
  }
]

describe('demo site smoke', () => {
  let browser
  let html

  beforeAll(async function () {
    if (!existsSync(indexHtml)) {
      throw new Error('docs/index.html missing — run `yarn build:demo` before the smoke tests')
    }
    html = readFileSync(indexHtml, 'utf8')
    browser = createBrowser(html)
    const jsFile = html.match(/assets\/(index-[^"]+\.js)/)[1]
    await import(docsDir + 'assets/' + jsFile)
    // Wait until the app has mounted and the data-driven selects are populated.
    await waitFor(() => browser.document.querySelectorAll('#app select option').length > 3000)
  })

  afterAll(() => browser && browser.cleanup())

  it('mounts and renders every demo select', () => {
    const options = browser.document.querySelectorAll('#app select option')
    options.length.should.be.above(3000)
  })

  for (const example of EXAMPLES) {
    it(`renders ${example.name}`, () => {
      const select = browser.document.querySelector(`#${example.id}`)
      should.exist(select, `#${example.id} should exist`)

      const options = select.querySelectorAll('option')
      options.length.should.equal(example.options)
      options[0].textContent.trim().should.equal(example.firstText)
      options[0].value.should.equal(example.firstValue)

      if (example.optgroups !== undefined) {
        select.querySelectorAll('optgroup').length.should.equal(example.optgroups)
      }
      if (example.firstOptgroup !== undefined) {
        select.querySelector('optgroup').label.should.equal(example.firstOptgroup)
      }
      if (example.selected !== undefined) {
        select.value.should.equal(example.selected)
      }
    })
  }

  it('事件: updates demoCallback when the zipcode select changes', async () => {
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

  it('依縣市篩選: changing county filters and updates the zipcode select', async () => {
    const d = browser.document
    const county = d.querySelector('#twzipcode__county--8')
    const zipcode = d.querySelector('#twzipcode__zipcode--8')

    // 臺中市 initially -> zipcodes filtered to 臺中市 (29 options, first 400)
    zipcode.querySelectorAll('option').length.should.equal(29)

    // Switch to 澎湖縣 and verify the zipcode list re-filters.
    const penghu = [...county.querySelectorAll('option')].find(o => o.value === '澎湖縣')
    should.exist(penghu, '澎湖縣 option should exist')
    county.value = '澎湖縣'
    county.dispatchEvent(new browser.window.Event('change'))

    await waitFor(() => {
      const first = zipcode.querySelector('option')
      return first && first.textContent.includes('澎湖縣')
    })
    const options = zipcode.querySelectorAll('option')
    options.length.should.equal(6)
    options[0].textContent.should.containEql('澎湖縣')
  })
})
