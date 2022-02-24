import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import axios from 'axios'
import helper from '@/helper'
import config from '../config'

const { ipcRenderer } = require('electron')

axios.defaults.headers.common['Authorization'] = config.basicAuth

axios.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['xtoken'] = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => {
  helper.error(error.response.statusText)
  return Promise.reject(error)
})
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
      if (event.ctrlKey && event.code === 'KeyI') {
        this.$store.commit('helper/switchScroll')
      }

    }
  },
  created () {
    store.commit('auth/getToken')
    window.addEventListener('keypress', this.doCommand)
  }
}).$mount('#app')
