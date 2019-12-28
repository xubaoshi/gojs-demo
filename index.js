import Vue from 'vue'
import App from './src/index.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
new Vue(App).$mount('#app')
