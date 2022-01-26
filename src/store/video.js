import axios from 'axios'
import config from './../../config'

export default {
  namespaced: true,
  state: {
    isNext: false,
    loading: false,
    videos: [],
    watched: 0
  },
  mutations: {
    favorite (state, payload) {
      state.videos.videoInfo.isFavorite = payload
    },
    mark (state, payload) {
      state.videos.videoInfo.markId = payload
    },
    setLastWatch (state, payload) {
      state.watched = payload
    },
    fetchingVideo (state, payload) {
      state.loading = payload
    },
    receivedVideo (state, payload) {
      state.videos = payload
    },
    isNext (state, payload) {
      state.isNext = payload
    }

  },

  actions: {
    getVideo ({ commit }, payload) {
      commit('fetchingVideo', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `watch/vidId=${payload}`).then(res => {
          commit('fetchingVideo', false)
          commit('receivedVideo', res.data.data)
          resolve(res)
        }).catch(err => {
          commit('fetchingVideo', false)
          reject(err)
        })
      })
    },
    getNextVideo ({ commit }, payload) {
      commit('isNext', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `watch/vidId=${payload}`).then(res => {
          commit('isNext', false)
          commit('receivedVideo', res.data.data)
          resolve(res)
        }).catch(err => {
          commit('isNext', false)
          reject(err)
        })
      })
    }
  }

}
