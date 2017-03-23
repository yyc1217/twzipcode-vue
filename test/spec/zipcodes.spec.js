import common from './common.spec'

const component = 'zipcodes'

describe('Zipcode', () => {
  common.testInitProps({
    component,
    length: 368,
    firstText: '100 臺北市 中正區',
    firstValue: '100',
    id: 'twzipcode__zipcode',
    name: 'zipcode',
    classes: [
      'twzipcode',
      'twzipcode__zipcode'
    ]
  })

  common.testTemplate({
    component,
    textTemplate: ':id :county:city',
    firstText: '100 臺北市中正區',
    valueTemplate: ':county:city',
    firstValue: '臺北市中正區'
  })

  common.testLocale({
    component,
    textLocale: 'en',
    firstText: '100 Taipei City Zhongzheng District',
    valueLocale: 'en',
    firstValue: '100'
  })

  common.testDiffLocale({
    component,
    textTemplate: ':id:county:city',
    firstText: '100臺北市中正區',
    valueLocale: 'en',
    valueTemplate: ':id:county:city',
    firstValue: '100Taipei CityZhongzheng District'
  })

  common.testSelected({
    component,
    selected: '423'
  })
})
