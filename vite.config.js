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
