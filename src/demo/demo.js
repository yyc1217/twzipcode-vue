import Vue from 'vue'
import { Zipcode, County, ZipcodeGroupby } from '../'
import '../demo/demo.scss'

new Vue({
  el: '#app',
  components: {
    TwzipcodeZipcode: Zipcode,
    TwzipcodeZipcodeGroupby: ZipcodeGroupby,
    TwzipcodeCounty: County
  },
  data () {
    return {
      myCounty: '臺中市',
      myZipcode: ''
    }
  }
})
