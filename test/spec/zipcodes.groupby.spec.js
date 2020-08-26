import {
  testInitProps,
  testTemplate,
  testLocale,
  testDiffLocale,
  testSelected,
  getComponent
} from './common'

import 'should'
import { ZipcodeGroupby as component } from '../../src/'

describe('Zipcode Groupby', () => {
  testInitProps({
    component,
    length: 371,
    firstText: '中正區',
    firstValue: '100',
    id: 'twzipcode__zipcode--groupby',
    name: 'zipcode',
    classes: [
      'twzipcode',
      'twzipcode__zipcode',
      'twzipcode__zipcode--groupby'
    ]
  })

  it('should group by 22 counties', () => {
    const c = getComponent(component)
    c.findAll('optgroup').length.should.equal(22)
  })

  testTemplate({
    component,
    textTemplate: ':id :county:city',
    firstText: '100 臺北市中正區',
    valueTemplate: ':county:city',
    firstValue: '臺北市中正區'
  })

  testLocale({
    component,
    textLocale: 'en',
    firstText: 'Zhongzheng District',
    valueLocale: 'en',
    firstValue: '100'
  })

  it('optgroup locale should follow text locale', () => {
    const c = getComponent(component, {
      textLocale: 'en'
    })
    let optgroup = c.element.getElementsByTagName('optgroup')[0]
    optgroup.label.should.eql('Taipei City')
  })

  testDiffLocale({
    component,
    textTemplate: ':id:county:city',
    firstText: '100臺北市中正區',
    valueLocale: 'en',
    valueTemplate: ':id:county:city',
    firstValue: '100Taipei CityZhongzheng District'
  })

  testSelected({
    component,
    value: '423'
  })
})
