import axios from 'axios'
import config from './../../config'

export default {
  namespaced: true,
  state: {
    libraries: [],
    loading: false,
    types: [],
    readBookId: 0,
  },
  mutations: {
    addFavorite (state, payload) {
      state.libraries.data = state.libraries.data.filter(item => {
        if (item.bookId == payload.b_id) {
          item.isFavorite = true
          item.markId = payload.markId
        }
        return item
      })
    },
    removeFavorite (state, payload) {
      state.libraries.data = state.libraries.data.filter(item => {
        if (item.bookId == payload.bookId) {
          item.isFavorite = false
        }
        return item
      })
    },
    readBookId (state, payload) {
      state.readBookId = payload
    },
    getLibrary (state, payload) {
      state.libraries = payload
    },
    loading (state, payload) {
      state.loading = payload
    },
    getBookType (state, payload) {
      state.types = payload
    },
    getMoreLibrary (state, payload) {
      for (let i = 0; i < payload.length; i++) {
        state.libraries.data.push(payload[i])
      }
    },
  },
  actions: {
    getLibrary ({ commit }, payload) {
      commit('loading', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `book/book_category_id=${payload.catId}/per_page=20?page=${payload.page}&filter=${payload.filter}`).then(res => {
          resolve(res.data)
          commit('loading', false)
          if (payload.page <= 1) {
            commit('getLibrary', res.data.data)
          } else {
            commit('getMoreLibrary', res.data.data.data)
          }
        }).catch(err => {
          reject(err)
          commit('loading', false)
        })
      })
    },
    getBookType ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `book-type`).then(res => {
          commit('getBookType', res.data.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getBookById ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `book/b_id=${payload}`).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    bookHistory ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `save-books-cache`, payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
