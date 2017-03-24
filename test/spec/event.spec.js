import Vue from 'vue'
import { Zipcode, County } from '../../src/'

let propsData = {
  template: `<div>
                <county></county>
                <zipcode></zipcode>
            </div>`,
  components: {
    County,
    Zipcode
  },
  data () {
    return {
      bus: new Vue({})
    }
  }
}

let createElem = id => {
  const elm = document.createElement('div')
  elm.id = id
  document.body.appendChild(elm)
  return elm
}

describe('Event', () => {
  it('should change zipcode value while county value is changed', done => {
    let elm = createElem('abcd')
    let vm = new Vue(propsData).$mount(elm)

    let countySelect = vm.$children[0]
    let zipcodeSelect = vm.$children[1]

    countySelect.value = '澎湖縣'
    zipcodeSelect.$nextTick(() => {
      zipcodeSelect.value.should.eql('880')
      done()
    })
  })
})