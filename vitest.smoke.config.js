import { defineConfig } from 'vitest/config'

// Smoke tests execute the BUILT artifacts (dist/, docs/) inside a jsdom
// document they set up themselves, so they run in the node environment
// without coverage. Run `yarn build && yarn build:demo` first.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/smoke/**/*.smoke.spec.js']
  }
})
