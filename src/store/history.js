import axios from 'axios'
import config from '../../config'

export default {
  namespaced: true,
  state: {
    loading: false,
    histories: []
  },
  mutations: {
    loading (state, payload) {
      state.loading = payload
    },
    getHistory (state, payload) {
      state.histories = payload
    }
  },
  actions: {
    getHistory ({ commit }) {
      commit('loading', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + 'history').then(res => {
          resolve(res.data)
          commit('loading', false)
          commit('getHistory', res.data.data)
        }).catch(err => {
          reject(err)
          commit('loading', false)
        })
      })
    },
    getHistoryUsage ({}, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `usage/month=${payload}`).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    postHistoryUsage ({}, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `usage`, payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
