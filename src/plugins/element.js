//按需引入
import Vue from 'vue'
import { Button,Input } from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button)
Vue.use(Input)