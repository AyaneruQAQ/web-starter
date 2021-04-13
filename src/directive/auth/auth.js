import Vue from 'vue'
import store from '@/store'

const auth = value => {
    let auth
    const authList = store.getters.authList || []

    const hasAuthorization = value => {
      if(authList.indexOf(value)>-1){
        return true
      }else{
        return false
      }
    }

    if (typeof value === 'string') {
      auth = hasAuthorization(value)
    } else {
      auth = value.some(item => {
        return hasAuthorization(item)
      })
    }
    return auth
  }
  
  // 注册 v-auth 指令
  Vue.directive('auth', {
    inserted: (el, binding) => {
      if (!auth(binding.value)) {
        el.remove()
      }
    },
    // update: (el, binding) => {
    //   console.log(binding)
    //   if (!auth(binding.value)) {
    //     el.remove()
    //   }
    // },
  })
  
  // 挂载 this.$auth() 方法
  Vue.prototype.$auth = auth