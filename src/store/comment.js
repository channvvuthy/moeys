import axios from 'axios'
import store from './index'
import config from './../../config'
export default {
  namespaced: true,
  state: {
    loading: false,
    comments: [],
    less_id: null,
    cmt_id: null
  },
  mutations: {
    getCommentId (state, payload) {
      state.cmt_id = payload
    },
    fetchingComment (state, payload) {
      state.loading = payload
    },
    receivedComment (state, payload) {
      state.comments = payload
      state.comments.data = payload.data.reverse()
    },
    receivedCommentPagination (state, payload) {
      if (payload.data.length) {
        for (let i = 0; i < payload.data.length; i++) {
          state.comments.data.push(payload.data[i])
        }
      }
    },
    postComment (state, payload) {
      state.comments.data.unshift(payload)
    },
    getLessonId (state, payload) {
      state.less_id = payload
    }

  },

  actions: {
    getComment ({ commit }, payload) {
      commit('fetchingComment', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `comment/less_id=${payload.less_id}/per_page=${payload.per_page}?page=${payload.page}`).then(res => {
          commit('fetchingComment', false)
          if (payload.page > 1) {
            commit('receivedCommentPagination', res.data.data)
          } else {
            commit('receivedComment', res.data.data)
          }
          resolve(res)
        }).catch(err => {
          commit('fetchingComment', false)
          reject(err)
        })
      })
    },
    // eslint-disable-next-line no-empty-pattern
    postComment ({}, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `comment/less_id=${store.state.comment.less_id}`, payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // eslint-disable-next-line no-empty-pattern
    getSubComment ({}, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `comment/less_id=${store.state.comment.less_id}/cmt_id=${payload}`).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // eslint-disable-next-line no-empty-pattern
    replyComment ({}, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `comment/less_id=${store.state.comment.less_id}/cmt_id=${store.state.comment.cmt_id}`, payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

}
