import common from './common.spec'
import 'should'

const component = 'zipcodes.groupby'

describe('Zipcode Groupby', () => {
  common.testInitProps({
    component,
    length: 368,
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
    const c = common.getComponent(component)
    c.find('optgroup').length.should.equal(22)
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
    firstText: 'Zhongzheng District',
    valueLocale: 'en',
    firstValue: '100'
  })

  it('optgroup locale should follow text locale', () => {
    const c = common.getComponent(component, {
      textLocale: 'en'
    })
    let optgroup = c.find('optgroup')[0]
    optgroup.hasAttribute('label', 'Taipei City').should.be.true()
  })

  common.testSelected({
    component,
    selected: '423'
  })
})
