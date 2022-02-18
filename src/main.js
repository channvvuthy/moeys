import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import axios from 'axios'

const { ipcRenderer } = require('electron')

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    doCommand (event) {
      let cmd = String.fromCharCode(event.keyCode).toLowerCase()
      if (event.ctrlKey && event.code === 'KeyQ') {
        localStorage.clear()
        this.$store.dispatch('auth/logout').then(() => {
          ipcRenderer.send('exit')
        })
      }

    }
  },
  created () {
    store.commit('auth/getToken')
    window.addEventListener('keypress', this.doCommand)
  }
}).$mount('#app')
