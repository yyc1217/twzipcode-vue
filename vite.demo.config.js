import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Demo site: dev server (`vite`) and static build to docs/ for GitHub Pages
export default defineConfig({
  root: fileURLToPath(new URL('./src/demo', import.meta.url)),
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      // Use the full build (with template compiler) so the in-DOM template
      // inside #app can be compiled at runtime. The default runtime-only
      // build cannot compile it, which leaves the page blank.
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    outDir: fileURLToPath(new URL('./docs', import.meta.url)),
    emptyOutDir: true,
    commonjsOptions: {
      // twzipcode-data loads its locale data via a computed dynamic require
      // (`require('./' + locale + '/counties')`). Rollup cannot resolve that
      // statically, so register the locale data files as dynamic require
      // targets, otherwise the demo throws "Could not dynamically require".
      dynamicRequireTargets: [
        'node_modules/twzipcode-data/dist/*/counties.js',
        'node_modules/twzipcode-data/dist/*/zipcodes.js'
      ]
    }
  }
})
