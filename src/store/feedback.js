import axios from 'axios'
import config from '../../config'

export default {
  namespaced: true,
  state: {
    loading: false,

  },
  mutations: {
    loading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    feedback ({ commit }, payload) {
      commit('loading', true)
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `student/feedback`, payload).then(res => {
          resolve(res.data)
          commit('loading', false)
        }).catch(err => {
          reject(err)
          commit('loading', false)
        })
      })
    }
  }
}
