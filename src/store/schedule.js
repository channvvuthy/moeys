import axios from 'axios'
import config from './../../config'

export default {
  namespaced: true,
  state: {
    loading: false,
    schedules: [],
    schedule: {}
  },
  mutations: {
    createSchedule (state, payload) {
      state.schedules.push(payload)
    },
    mySchedule (state, payload) {
      state.schedule = payload
    },
    updateRepeat (state, payload) {
      state.schedules.filter(item => {
        if (item.scheduleId == payload.schedule_id) {
          item.isActive = payload.isActive
        }
        return item
      })
    },
    deleteSchedule (state, payload) {
      state.schedules = state.schedules.filter(item => item.scheduleId != payload)
    },
    loading (state, payload) {
      state.loading = payload
    },
    getSchedule (state, payload) {
      state.schedules = payload
    }
  },

  actions: {
    getSchedule ({ commit }) {
      commit('loading', true)
      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + `schedule`).then(res => {
          commit('loading', false)
          commit('getSchedule', res.data.data)
          resolve(res.data)
        }).catch(err => {
          commit('loading', false)
          reject(err)
        })
      })
    },
    createSchedule ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(config.apiUrl + `schedule`, payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteSchedule ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(config.apiUrl + `schedule/schedule_id=${payload}`).then(res => {
          resolve(res.data)
          commit('deleteSchedule', payload)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateSchedule ({}, payload) {
      return new Promise((resolve, reject) => {
        axios.put(config.apiUrl + `schedule/schedule_id=${payload.scheduleId}`, payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateRepeat ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.put(config.apiUrl + `schedule-is-active/schedule_id=${payload.schedule_id}`, payload).then(res => {
          commit('updateRepeat', payload)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },

}
