import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.css'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import {loadMatomo} from './matomo'

export const init = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    loadMatomo()
  }

  Vue.config.productionTip = false
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
