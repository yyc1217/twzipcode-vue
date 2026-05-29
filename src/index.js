// Import vue components
import Zipcode from './components/zipcodes.vue'
import County from './components/counties.vue'
import ZipcodeGroupby from './components/zipcodes.groupby.vue'

// Declare install function executed by app.use()
export function install (app) {
  if (install.installed) return
  install.installed = true

  app.component('county', County)
  app.component('zipcode', Zipcode)
  app.component('zipcode-groupby', ZipcodeGroupby)
}

// Create module definition for app.use()
const plugin = {
  install
}

export default plugin

// To allow use as module (npm/webpack/etc.) export component
export {
  Zipcode,
  County,
  ZipcodeGroupby
}
