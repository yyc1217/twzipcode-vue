// Import vue components
import Zipcode from './components/zipcodes.vue'
import County from './components/counties.vue'
import ZipcodeGroupby from './components/zipcodes.groupby.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
	install.installed = true

	Vue.component('county', County)
    Vue.component('zipcode', Zipcode)
    Vue.component('zipcode-groupby', ZipcodeGroupby)
}

// Create module definition for Vue.use()
const plugin = {
	install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export {
    Zipcode,
    County,
    ZipcodeGroupby
}
