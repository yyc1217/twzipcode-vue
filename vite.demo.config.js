import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Demo site: dev server (`vite`) and static build to docs/ for GitHub Pages
export default defineConfig({
  root: fileURLToPath(new URL('./src/demo', import.meta.url)),
  base: './',
  plugins: [vue()],
  build: {
    outDir: fileURLToPath(new URL('./docs', import.meta.url)),
    emptyOutDir: true
  }
})
