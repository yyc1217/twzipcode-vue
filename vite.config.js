import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Library build + Vitest configuration
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      name: 'TwZipcode',
      formats: ['es', 'umd'],
      fileName: (format) => `twzipcode.${format}.js`
    },
    rollupOptions: {
      // Keep vue out of the bundle; consumers provide it
      external: ['vue'],
      output: {
        // Library exposes both named exports and a default plugin object
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    },
    commonjsOptions: {
      // twzipcode-data loads its locale data via a computed dynamic require
      // (`require('./' + locale + '/counties')`). Rollup cannot resolve that
      // statically, so register the locale data files as dynamic require
      // targets, otherwise components render no data at runtime.
      dynamicRequireTargets: [
        'node_modules/twzipcode-data/dist/*/counties.js',
        'node_modules/twzipcode-data/dist/*/zipcodes.js'
      ]
    },
    sourcemap: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/spec/**/*.spec.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'test/coverage',
      include: ['src/**/*.{js,vue}']
    }
  }
})
