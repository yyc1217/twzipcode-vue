import { testInitProps, testTemplate } from './common.spec'

describe('Zipcode', () => {
  testInitProps({
    component: 'zipcodes',
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
    component: 'zipcodes',
    textTemplate: ':id :county:city',
    firstText: '100 臺北市中正區',
    valueTemplate: ':county:city',
    firstValue: '臺北市中正區'
  })
})
