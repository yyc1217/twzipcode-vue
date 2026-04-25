# twzipcode-vue

> 中華郵政郵遞區號 Vuejs components

[![Github actions](https://github.com/yyc1217/twzipcode-vue/actions/workflows/actions.yml/badge.svg)](https://github.com/yyc1217/twzipcode-vue/actions)
[![Coverage Status](https://coveralls.io/repos/github/yyc1217/twzipcode-vue/badge.svg?branch=master)](https://coveralls.io/github/yyc1217/twzipcode-vue?branch=master)
[![npm](https://img.shields.io/npm/dt/twzipcode-vue.svg)](https://www.npmjs.com/package/twzipcode-vue)
[![npm](https://img.shields.io/npm/v/twzipcode-vue.svg)](https://www.npmjs.com/package/twzipcode-vue)
[![npm](https://img.shields.io/npm/l/twzipcode-vue.svg)]()
[![dependencies](https://david-dm.org/yyc1217/twzipcode-vue.svg)](https://david-dm.org/yyc1217/twzipcode-vue)
[![devDependency](https://david-dm.org/yyc1217/twzipcode-vue/dev-status.svg)](https://david-dm.org/yyc1217/twzipcode-vue#info=devDependencies)
[![GitHub stars](https://img.shields.io/github/stars/yyc1217/twzipcode-vue.svg?style=social&label=Star)]()

## 特點 Feature
- 縣市和郵遞區號自動產生 [demo](https://yyc1217.github.io/twzipcode-vue/#所有郵遞區號)
- 可修改 value 與 text 的格式 [demo](https://yyc1217.github.io/twzipcode-vue/#value與text格式)
- 可切換成英語 [demo](https://yyc1217.github.io/twzipcode-vue/#英語)
- callback [demo](https://yyc1217.github.io/twzipcode-vue/#事件)

## Version Info

- **Version 3.x** requires **Vue 3.x**
- **Version 2.x** requires **Vue 2.x**

## 安裝 Install

### npm
```bash
npm install twzipcode-vue --save
```

## 用法 Usage

### Vue 3

#### With `createApp`
```javascript
import { createApp } from 'vue'
import { Zipcode, County, ZipcodeGroupby } from 'twzipcode-vue'
import App from './App.vue'

const app = createApp(App)

app.component('county', County)
app.component('zipcode', Zipcode)
app.component('zipcode-groupby', ZipcodeGroupby)

app.mount('#app')
```

#### With `<script setup>`
```vue
<script setup>
import { ref } from 'vue'
import { Zipcode, County, ZipcodeGroupby } from 'twzipcode-vue'

const county = ref('臺北市')
const zipcode = ref('100')
</script>

<template>
  <div>
    <County v-model="county" />
    <Zipcode v-model="zipcode" :filterByCounty="county" />
    <ZipcodeGroupby v-model="zipcode" />
  </div>
</template>
```

#### With Options API
```javascript
import { Zipcode, County, ZipcodeGroupby } from 'twzipcode-vue'

export default {
  components: {
    Zipcode,
    County,
    ZipcodeGroupby
  },
  data() {
    return {
      county: '臺北市',
      zipcode: '100'
    }
  }
}
```

### Vue 2 (Version 2.x)

If you're still using Vue 2, install the previous version:

```bash
npm install twzipcode-vue@2 --save
```

```javascript
import Vue from 'vue'
import { Zipcode, County, ZipcodeGroupby } from 'twzipcode-vue'

new Vue({
  el: '#app',
  components: {
    County,
    Zipcode,
    ZipcodeGroupby
  }
})
```

## Components

### County Component

County selector component.

**Props:**
- `modelValue` (String): Selected county value (default: '臺北市')
- `textTemplate` (String): Template for display text (default: ':name')
- `valueTemplate` (String): Template for value (default: ':id')
- `id` (String): HTML id attribute (default: 'twzipcode__county')
- `name` (String): HTML name attribute (default: 'county')
- `textLocale` (String): Text locale language (default: 'zh-tw')
- `valueLocale` (String): Value locale language (default: 'zh-tw')

**Events:**
- `update:modelValue`: Emitted when selection changes

### Zipcode Component

Zipcode selector component with optional county filtering.

**Props:**
- `modelValue` (String): Selected zipcode value (default: '100')
- `filterByCounty` (String): Filter zipcodes by county
- `textTemplate` (String): Template for display text (default: ':zipcode :county :city')
- `valueTemplate` (String): Template for value (default: ':zipcode')
- `id` (String): HTML id attribute (default: 'twzipcode__zipcode')
- `name` (String): HTML name attribute (default: 'zipcode')
- `textLocale` (String): Text locale language (default: 'zh-tw')
- `valueLocale` (String): Value locale language (default: 'zh-tw')

**Events:**
- `update:modelValue`: Emitted when selection changes

### ZipcodeGroupby Component

Zipcode selector component with options grouped by county.

**Props:**
- `modelValue` (String): Selected zipcode value (default: '100')
- `textTemplate` (String): Template for display text (default: ':city')
- `valueTemplate` (String): Template for value (default: ':zipcode')
- `id` (String): HTML id attribute (default: 'twzipcode__zipcode--groupby')
- `name` (String): HTML name attribute (default: 'zipcode')
- `textLocale` (String): Text locale language (default: 'zh-tw')
- `valueLocale` (String): Value locale language (default: 'zh-tw')

**Events:**
- `update:modelValue`: Emitted when selection changes

## Examples

### Basic Usage
```vue
<template>
  <div>
    <County v-model="county" />
    <Zipcode v-model="zipcode" :filterByCounty="county" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { County, Zipcode } from 'twzipcode-vue'

const county = ref('臺北市')
const zipcode = ref('100')
</script>
```

### English Locale
```vue
<template>
  <County v-model="county" textLocale="en" valueLocale="en" />
</template>

<script setup>
import { ref } from 'vue'
import { County } from 'twzipcode-vue'

const county = ref('Taipei')
</script>
```

### Custom Templates
```vue
<template>
  <Zipcode 
    v-model="zipcode" 
    textTemplate=":zipcode - :city"
    valueTemplate=":id"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Zipcode } from 'twzipcode-vue'

const zipcode = ref('100')
</script>
```

## Showcases
[https://yyc1217.github.io/twzipcode-vue/](https://yyc1217.github.io/twzipcode-vue/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run tests
npm run test

# build for production
npm run prod
```

## 資料來源 Data
[twzipcode-data](https://github.com/yyc1217/twzipcode-data)
