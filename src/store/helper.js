import axios from 'axios'
import config from './../../config'

export default {
  namespaced: true,
  state: {
    loading: false,
    loadingSchool: false,
    loadingClass: false,
    provinces: [],
    schools: [],
    classes: [],
    isGrade: false,
    showScroll: false,

  },
  mutations: {
    switchScroll (state, payload) {
      state.showScroll = !state.showScroll
    },
    showGrade (state, payload) {
      state.isGrade = payload
    },
    fetchingProvinces (state, payload) {
      state.loading = payload
    },
    receivedProvinces (state, payload) {
      state.provinces = payload
    },
    fetchingSchools (state, payload) {
      state.loadingSchool = payload
    },
    receivedSchools (state, payload) {
      state.schools = payload
    },
    fetchingClasses (state, payload) {
      state.loadingClass = payload
    },
    receivedClasses (state, payload) {
      state.classes = payload
    }

  },

  actions: {
    getProvinces ({ commit }) {
      commit('fetchingProvinces', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + 'provinces').then(res => {
          commit('fetchingProvinces', false)
          commit('receivedProvinces', res.data.data)
          resolve(res)
        }).catch(err => {
          commit('fetchingProvinces', false)
          reject(err)
        })
      })
    },
    getSchools ({ commit }, payload) {
      commit('fetchingSchools', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `schools/province_id=${payload}`).then(res => {
          commit('fetchingSchools', false)
          commit('receivedSchools', res.data.data)
          resolve(res)
        }).catch(err => {
          commit('fetchingSchools', false)
          reject(err)
        })
      })
    },
    getClasses ({ commit }) {
      commit('fetchingClasses', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `classes`).then(res => {
          commit('fetchingClasses', false)
          commit('receivedClasses', res.data.data)
          resolve(res)
        }).catch(err => {
          commit('fetchingClasses', false)
          reject(err)
        })
      })
    }
  },

}
