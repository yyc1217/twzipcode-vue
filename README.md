# vue-twzipcode

> 中華郵政郵遞區號 Vuejs components

## 安裝 Install

### npm
```bash
npm install vue-twzipcode --save
```

## 用法 Usage
```javascript
import Vue from 'vue'
import { Zipcode, County, ZipcodeGroupby } from 'vue-twzipcode'

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
[https://yyc1217.github.io/vue-twzipcode/](https://yyc1217.github.io/vue-twzipcode/)

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