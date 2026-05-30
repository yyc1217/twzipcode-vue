import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: ['dist/**', 'docs/**', 'coverage/**', 'test/coverage/**']
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // browser
        window: 'readonly',
        document: 'readonly',
        global: 'readonly'
      }
    },
    rules: {
      // The demo registers components in PascalCase keys but the templates use
      // the kebab/multi-word tags; keep the library's existing naming.
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    // Node-side config and build files
    files: ['*.config.js', 'vite*.config.js', 'vitest*.config.js'],
    languageOptions: {
      globals: { process: 'readonly', __dirname: 'readonly' }
    }
  },
  {
    // Tests (vitest globals + jsdom helpers)
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        globalThis: 'readonly'
      }
    }
  }
]
