import {
  testInitProps,
  testTemplate,
  testLocale,
  testDiffLocale,
  testSelected,
  getComponent
} from './common'

import { Zipcode as component } from '../../src/'

describe('Zipcode', () => {
  testInitProps({
    component,
    length: 371,
    firstText: '100 臺北市 中正區',
    firstValue: '100',
    id: 'twzipcode__zipcode',
    name: 'zipcode',
    classes: [
      'twzipcode',
      'twzipcode__zipcode'
    ]
  })

  testTemplate({
    component,
    textTemplate: ':zipcode :county:city',
    firstText: '100 臺北市中正區',
    valueTemplate: ':county:city',
    firstValue: '臺北市中正區'
  })

  testLocale({
    component,
    textLocale: 'en',
    firstText: '100 Taipei City Zhongzheng District',
    valueLocale: 'en',
    firstValue: '100'
  })

  testDiffLocale({
    component,
    textTemplate: ':zipcode:county:city',
    firstText: '100臺北市中正區',
    valueLocale: 'en',
    valueTemplate: ':zipcode:county:city',
    firstValue: '100Taipei CityZhongzheng District'
  })

  testSelected({
    component,
    value: '423'
  })

  it('should filter by county 澎湖縣', () => {
    const c = getComponent(component, {
      filterByCounty: '澎湖縣'
    })
    let options = c.findAll('option')
    options.length.should.equal(6)
  })
})
