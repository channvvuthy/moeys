import axios from 'axios'
import config from './../../config'

export default {
  namespaced: true,
  state: {
    loading: false,
    notifications: [],
    details: {}
  },
  mutations: {
    getDetail(state, payload){
      state.details = payload
    },
    loading (state, payload) {
      state.loading = payload
    },
    getNotifications (state, payload) {
      state.notifications = payload
    },
    getPagination (state, payload) {
      for (let i = 0; i < payload.length; i++) {
        state.notifications.push(payload[i])
      }
    }
  },

  actions: {
    getNotifications ({ commit }, payload) {
      commit('loading', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `notification/per_page=20?page=${payload.page}`).then(res => {
          resolve(res.data)
          commit('loading', false)
          commit('getNotifications', res.data.data.data)
        }).catch(err => {
          reject(err)
          commit('loading', false)
        })
      })
    },
    getPagination ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `notification/per_page=20?page=${payload.page}`).then(res => {
          resolve(res.data)
          commit('getPagination', res.data.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDetail({commit}, payload){
      return new Promise((resolve, reject) =>{
        axios.get(config.apiUrl + `notification/notify_id=${payload}`).then(res =>{
          commit("getDetail", res.data.data)
          resolve(res.data.data)
        }).catch(err =>{
          reject(err)
        })
      })
    },
    getNewsDetail({commit}, payload){
      return new Promise((resolve, reject) =>{
        axios.get(config.apiUrl + `news-read/news_id=${payload}`).then(res =>{
          commit("getDetail", res.data.data)
          resolve(res.data.data)
        }).catch(err =>{
          reject(err)
        })
      })
    }
  },

}
