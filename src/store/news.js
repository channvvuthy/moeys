import axios from 'axios'
import config from '../../config'

export default {
  namespaced: true,
  state: {
    news: [],
    newByCat: [],
    details: []
  },
  mutations: {
    getDetail (state, payload) {
      state.details = payload
    },
    getNews (state, payload) {
      state.news = payload
    },
    getNewsByCat (state, payload) {
      state.newByCat = payload
    },
    getNewsByPaginate (state, payload) {
      for (let i = 0; i < payload.length; i++) {
        state.newByCat.push(payload[i])
      }
    }
  },
  actions: {
    getNews ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `news-categories`).then(res => {
          resolve(res.data)
          commit('getNews', res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getNewsByCat ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `news/cat_id=${payload.cat_id}/per_page=20?page=${payload.page}`).then(res => {
          if (payload.page == 1) {
            commit('getNewsByCat', res.data.data.data)
          } else {
            commit('getNewsByPaginate', res.data.data.data)
          }
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDetail ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `news-read/news_id=${payload}`).then(res => {
          resolve(res.data)
          commit('getDetail', res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
