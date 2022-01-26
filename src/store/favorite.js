import axios from 'axios'
import config from './../../config'
export default {
  namespaced: true,
  state: {
    loading: false,
    favorites: []
  },
  mutations: {
    fetchingFavorite (state, payload) {
      state.loading = payload
    },
    receivedFavorite (state, payload) {
      state.favorites = payload
    }

  },

  actions: {
    getFavorite ({ commit }) {
      commit('fetchingFavorite', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + 'videomark').then(res => {
          commit('fetchingFavorite', false)
          commit('receivedFavorite', res.data.data)
          resolve(res)
        }).catch(err => {
          commit('fetchingFavorite', false)
          reject(err)
        })
      })
    },
    favorite ({ commit }, payload) {
      commit('fetchingFavorite', true)
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `bookmark/b_type=${payload.b_type}/b_id=${payload.b_id}`).then(res => {
          commit('fetchingFavorite', false)
          commit('receivedFavorite', res.data.data)
          resolve(res.data)
        }).catch(err => {
          commit('fetchingFavorite', false)
          reject(err)
        })
      })
    },
    removeFavorite ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `remove/bookmark/mark_id=${payload}`).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

}
