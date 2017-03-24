import common from './common.spec'
import { County as component } from '../../src/'

describe('County', () => {
  common.testInitProps({
    component,
    length: 22,
    firstText: '臺北市',
    firstValue: '臺北市',
    id: 'twzipcode__county',
    name: 'county',
    classes: [
      'twzipcode',
      'twzipcode__county'
    ]
  })

  common.testTemplate({
    component,
    textTemplate: ':id:name',
    firstText: '臺北市臺北市',
    valueTemplate: ':id:name',
    firstValue: '臺北市臺北市'
  })

  common.testLocale({
    component,
    textLocale: 'en',
    firstText: 'Taipei City',
    valueLocale: 'en',
    firstValue: '臺北市'
  })

  common.testDiffLocale({
    component,
    textTemplate: ':id:name',
    firstText: '臺北市臺北市',
    valueLocale: 'en',
    valueTemplate: ':id:name',
    firstValue: '臺北市Taipei City'
  })

  common.testSelected({
    component,
    selected: '臺中市'
  })
})
