import { createApp } from 'vue'
import { Zipcode, County, ZipcodeGroupby } from '../'
import './demo.scss'

createApp({
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
}).mount('#app')
