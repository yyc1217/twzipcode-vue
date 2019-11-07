var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const exposedProperties = ['window', 'navigator', 'document']

const { document } = (new JSDOM('', {
  url: "http://localhost"
})).window;
global.document = document;
global.window = document.defaultView

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}
