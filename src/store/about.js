import axios from 'axios'
import config from './../../config'

export default {
  namespaced: true,
  state: {
    loading: false,
    about: {}
  },
  mutations: {
    gettingAbout (state, payload) {
      state.loading = payload
    },
    getAbout (state, payload) {
      state.about = payload
    }
  },

  actions: {
    getAbout ({ commit }) {
      commit('gettingAbout', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `about-us`).then(res => {
          resolve(res.data)
          commit('getAbout', res.data.data)
          commit('gettingAbout', false)
        }).catch(err => {
          reject(err)
          commit('gettingAbout', false)
        })
      })
    }

  },

}
