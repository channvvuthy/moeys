import axios from 'axios'
import config from '../../config'

export default {
  namespaced: true,
  state: {
    users: [],
    loading: false,
  },
  mutations: {
    removeStudent (state, payload) {
      state.users = state.users.filter(item => item.id != payload)
    },
    loading (state, payload) {
      state.loading = payload
    },

    getAllAccount (state, payload) {
      state.users = payload
    }
  },
  actions: {
    getAllAccount ({ commit }) {
      commit('loading', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `list-all-account`).then(res => {
          resolve(res.data)
          commit('loading', false)
          commit('getAllAccount', res.data.data)
        }).catch(err => {
          commit('loading', false)
          reject(err)
        })
      })
    },
    switchStudent ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `switch-student/studentId=${payload}`).then(res => {
          resolve(res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    removeStudent ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `remove-child-student/studentId=${payload}`).then(res => {
          resolve(res.data)
          commit('removeStudent', payload)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addNewStudent ({}, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `add-new-child-student`, payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
