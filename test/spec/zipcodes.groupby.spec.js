import { testInitProps, testTemplate } from './common.spec'
import 'should'
import { mount } from 'avoriaz'

const component = mount(require(`../../src/components/zipcodes.groupby.vue`))

describe('Zipcode Groupby', () => {
  testInitProps({
    component: 'zipcodes.groupby',
    length: 368,
    firstText: '中正區',
    firstValue: '100',
    id: 'twzipcode__zipcode--groupby',
    classes: [
      'twzipcode',
      'twzipcode__zipcode',
      'twzipcode__zipcode--groupby'
    ]
  })

  it('should group by 22 counties', () => {
    component.find('optgroup').length.should.equal(22)
  })

  testTemplate({
    component: 'zipcodes.groupby',
    textTemplate: ':id :county:city',
    firstText: '100 臺北市中正區',
    valueTemplate: ':county:city',
    firstValue: '臺北市中正區'
  })
})
