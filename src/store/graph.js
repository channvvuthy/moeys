import axios from 'axios'
import config from './../../config'

export default {
  namespaced: true,
  state: {
    chartData: {
      labels: [],
      datasets: [{
        label: 'News reports',
        backgroundColor: [],
        data: []
      }]
    },
    loading: false,
    graph: [],
    usage: [],
    subject: []

  },
  mutations: {
    renderGraph (state, payload) {
      state.chartData = payload
    },
    loading (state, payload) {
      state.loading = payload
    },
    getGraph (state, payload) {
      state.graph = payload
    },
    getUsage (state, payload) {
      state.usage = payload
    },
    getBySubject (state, payload) {
      state.subject = payload
    }

  },

  actions: {

    getGraph ({ commit }, payload) {
      commit('loading', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `graph`).then(res => {
          resolve(res.data)
          commit('loading', false)
          commit('getGraph', res.data.data)
        }).catch(err => {
          reject(err)
          commit('loading', false)
        })
      })
    },
    getUsage ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `usage/month=${payload}`).then(res => {
          commit('getUsage', res.data.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    postUsage ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `usage`, payload).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getBySubject ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `graph/subj_id=${payload}`).then(res => {
          commit('getBySubject', res.data.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }

  },

}
