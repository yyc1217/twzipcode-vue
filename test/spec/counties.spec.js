import {
          testInitProps,
          testTemplate,
          testLocale,
          testDiffLocale,
          testSelected
       } from './common'

import { County as component } from '../../src/'

describe('County', () => {
  testInitProps({
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

  testTemplate({
    component,
    textTemplate: ':id:name',
    firstText: '臺北市臺北市',
    valueTemplate: ':id:name',
    firstValue: '臺北市臺北市'
  })

  testLocale({
    component,
    textLocale: 'en',
    firstText: 'Taipei City',
    valueLocale: 'en',
    firstValue: '臺北市'
  })

  testDiffLocale({
    component,
    textTemplate: ':id:name',
    firstText: '臺北市臺北市',
    valueLocale: 'en',
    valueTemplate: ':id:name',
    firstValue: '臺北市Taipei City'
  })

  testSelected({
    component,
    value: '臺中市'
  })
})
