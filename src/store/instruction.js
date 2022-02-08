import axios from 'axios'
import config from './../../config'

export default {
  namespaced: true,
  state: {
    loading: false,
    instructions: {}
  },
  mutations: {
    fetchingInstruction (state, payload) {
      state.loading = payload
    },
    receivedInstruction (state, payload) {
      state.instructions = payload
    }
  },

  actions: {
    getInstruction ({ commit }) {
      commit('fetchingInstruction', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + 'introduction-video').then(res => {
          commit('fetchingInstruction', false)
          commit('receivedInstruction', res.data.data)
          resolve(res)
        }).catch(err => {
          commit('fetchingInstruction', false)
          reject(err)
        })
      })
    }
  },

}
