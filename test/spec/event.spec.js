import 'should'

import { Zipcode, County } from '../../src/'
import { mount } from '@vue/test-utils'

const parentComponent = {
  template: `<div>
                <county v-model="myCounty"></county>
                <zipcode v-model="myZipcode"
                         :filter-by-county="myCounty"></zipcode>
            </div>`,
  components: {
    County,
    Zipcode
  },
  data () {
    return {
      myCounty: '',
      myZipcode: ''
    }
  }
}

describe('Event', () => {
  it('should change zipcode value while county value is changed', async () => {
    const c = mount(parentComponent)

    const countySelectOptions = c.findComponent(County).findAll('option')
    // 澎湖縣
    await countySelectOptions.at(16).setSelected()

    const zipcodeSelect = c.findComponent(Zipcode)
    zipcodeSelect.element.value.should.eql('880')
  })
})
