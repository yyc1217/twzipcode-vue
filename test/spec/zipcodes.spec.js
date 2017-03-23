import { testInitProps, testTemplate, testLocale } from './common.spec'

const component = 'zipcodes'

describe('Zipcode', () => {
  testInitProps({
    component,
    length: 368,
    firstText: '100 臺北市 中正區',
    firstValue: '100',
    id: 'twzipcode__zipcode',
    classes: [
      'twzipcode',
      'twzipcode__zipcode'
    ]
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
    firstText: '100 Taipei City Zhongzheng District',
    valueLocale: 'en',
    firstValue: '100'
  })
})
