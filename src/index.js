// Import vue components
import Zipcode from './components/zipcodes.vue'
import County from './components/counties.vue'
import ZipcodeGroupby from './components/zipcodes.groupby.vue'

// Declare install function executed by Vue.use()
export function install(app) {
	if (install.installed) return;
	install.installed = true

	app.component('county', County)
	app.component('zipcode', Zipcode)
	app.component('zipcode-groupby', ZipcodeGroupby)
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
export default plugin
export {
	Zipcode,
	County,
	ZipcodeGroupby
}
