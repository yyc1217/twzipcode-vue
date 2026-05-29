# twzipcode-vue

> 中華郵政郵遞區號 Vuejs components

[![Github actions](https://github.com/yyc1217/twzipcode-vue/actions/workflows/actions.yml/badge.svg)](https://github.com/yyc1217/twzipcode-vue/actions)
[![Coverage Status](https://coveralls.io/repos/github/yyc1217/twzipcode-vue/badge.svg?branch=master)](https://coveralls.io/github/yyc1217/twzipcode-vue?branch=master)
[![npm](https://img.shields.io/npm/dt/twzipcode-vue.svg)](https://www.npmjs.com/package/twzipcode-vue)
[![npm](https://img.shields.io/npm/v/twzipcode-vue.svg)](https://www.npmjs.com/package/twzipcode-vue)
[![npm](https://img.shields.io/npm/l/twzipcode-vue.svg)]()
[![GitHub stars](https://img.shields.io/github/stars/yyc1217/twzipcode-vue.svg?style=social&label=Star)]()

## 特點 Feature
- 縣市和郵遞區號自動產生 [demo](https://yyc1217.github.io/twzipcode-vue/#所有郵遞區號)
- 可修改 value 與 text 的格式 [demo](https://yyc1217.github.io/twzipcode-vue/#value與text格式)
- 可切換成英語 [demo](https://yyc1217.github.io/twzipcode-vue/#英語)
- callback [demo](https://yyc1217.github.io/twzipcode-vue/#事件)

## 安裝 Install

### npm
```bash
npm install twzipcode-vue --save
```

> 本套件 v3 起支援 **Vue 3**。若仍使用 Vue 2，請安裝 v2.x。

## 用法 Usage
```javascript
import { createApp } from 'vue'
import { Zipcode, County, ZipcodeGroupby } from 'twzipcode-vue'

// or
import Zipcode from 'twzipcode-vue/zipcode'
import ZipcodeGroupby from 'twzipcode-vue/zipcode-groupby'
import County from 'twzipcode-vue/county'

createApp({
  components: {

    // 縣市
    County,

    // 郵遞區號
    Zipcode,

    // 依縣市分組的郵遞區號
    ZipcodeGroupby
  }
}).mount('#app')
```

也可以用 plugin 方式全域註冊（元件名稱為 `county`、`zipcode`、`zipcode-groupby`）：

```javascript
import { createApp } from 'vue'
import TwZipcode from 'twzipcode-vue'

createApp(App).use(TwZipcode).mount('#app')
```

### ⚠️ v2 → v3 Breaking change

元件的 `v-model` 已從 Vue 2 慣例（`value` prop + `input` 事件）改為 Vue 3 慣例
（`modelValue` prop + `update:modelValue` 事件）。`v-model` 的用法不變，但若先前以
明確的 `:value` / `@input` 綁定，請改為 `:model-value` / `@update:model-value`。

## Showcases
[https://yyc1217.github.io/twzipcode-vue/](https://yyc1217.github.io/twzipcode-vue/)

## Build Setup

本專案使用 [Vite](https://vitejs.dev/) 建置、[Vitest](https://vitest.dev/) 測試。

``` bash
# install dependencies
yarn install

# serve demo with hot reload (Vite dev server)
yarn dev

# run tests (Vitest)
yarn test

# build library to dist/
yarn build

# build demo site to docs/
yarn build:demo
```

## 資料來源 Data
[twzipcode-data](https://github.com/yyc1217/twzipcode-data)