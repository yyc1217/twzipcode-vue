# twzipcode-vue

> 中華郵政郵遞區號 Vuejs components

[![Travis](https://img.shields.io/travis/yyc1217/twzipcode-vue.svg)]()
[![Github All Releases](https://img.shields.io/github/downloads/yyc1217/twzipcode-vue/total.svg)]()
[![npm](https://img.shields.io/npm/dt/twzipcode-vue.svg)]()
[![npm](https://img.shields.io/npm/v/twzipcode-vue.svg)]()
[![GitHub release](https://img.shields.io/github/release/yyc1217/twzipcode-vue.svg)]()
[![npm](https://img.shields.io/npm/l/twzipcode-vue.svg)]()
[![GitHub stars](https://img.shields.io/github/stars/yyc1217/twzipcode-vue.svg?style=social&label=Star)]()

## 安裝 Install

### npm
```bash
npm install twzipcode-vue --save
```

## 用法 Usage
```javascript
import Vue from 'vue'
import { Zipcode, County, ZipcodeGroupby } from 'twzipcode-vue'

new Vue({
  el: '#app',
  components: {

    // 縣市
    County,

    // 郵遞區號
    Zipcode,

    // 依縣市分組的郵遞區號
    ZipcodeGroupby
  }
})
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
```

## 資料來源 Data
[twzipcode-data](https://github.com/yyc1217/twzipcode-data)