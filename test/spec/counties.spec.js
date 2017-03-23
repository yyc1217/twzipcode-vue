import { testInitProps, testTemplate } from './common.spec'

describe('County', () => {
  testInitProps({
    component: 'counties',
    length: 22,
    firstText: '臺北市',
    firstValue: '臺北市',
    id: 'twzipcode__county',
    classes: [
      'twzipcode',
      'twzipcode__county'
    ]
  })

  testTemplate({
    component: 'counties',
    textTemplate: ':id:name',
    firstText: '臺北市臺北市',
    valueTemplate: ':id:name',
    firstValue: '臺北市臺北市'
  })
})
