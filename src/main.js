import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import axios from "axios"

axios.interceptors.request.use(
  (config) => {
      let token = localStorage.getItem('token');
      if (token) {
          config.headers['Authorization'] = token
      }
      return config;
  },

  (error) => {
      return Promise.reject(error);
  }
);

// axios.defaults.headers.common['Authorization'] = config.auth;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit("auth/getToken")
  }
}).$mount('#app')
