import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon

// import './permission' // permission control

import * as filters from './filters' // global filters

import './plugins/element.js'

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
