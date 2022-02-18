import axios from 'axios'
import config from './../../config'
import helper from '@/helper/index'

export default {
  namespaced: true,
  state: {
    loading: false,
    subjects: [],
    chapters: [],
    test: [],
    result: {},
    answer: {},

  },
  mutations: {
    getAnwser (state, payoad) {
      state.answer = payoad
    },
    getResult (state, payload) {
      state.result = payload
    },
    getMainSubject (state, payload) {
      state.subjects = payload
    },
    loading (state, payload) {
      state.loading = payload
    },
    getChapter (state, payload) {
      state.chapters = payload
    },
    getTest (state, payload) {
      state.test = payload
    },

  },

  actions: {

    getTest ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `test/lesson_id=${payload.lesson_id}/per_query=${payload.per_query}`).then(res => {
          resolve(res.data)
          commit('getTest', res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getChapter ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `test/subj_id=${payload.subject_id}`).then(res => {
          resolve(res.data)
          commit('getChapter', res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getMainSubject ({ commit }, payload) {
      commit('loading', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `subject?${helper.q(payload)}`).then(res => {
          resolve(res.data)
          commit('getMainSubject', res.data.data)
          commit('loading', false)
        }).catch(err => {
          commit('loading', false)
          reject(err)
        })
      })
    },
    onSubmitTest ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `test/lesson_id=${payload.lesson_id}`, payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },

}
