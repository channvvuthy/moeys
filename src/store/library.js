import axios from 'axios'
import config from './../../config'
export default {
  namespaced: true,
  state: {
    libraries: [],
    loading: false,
    types: []
  },
  mutations: {
    getLibrary(state, payload){
      state.libraries = payload
    },
    loading(state, payload){
      state.loading = payload
    },
    getBookType(state, payload){
      state.types = payload
    }
  },
  actions:{
    getLibrary({commit}, payload){
      commit("loading", true)
      return new Promise((resolve, reject)=>{
        axios.get(config.apiUrl + `book/book_category_id=${payload.catId}/per_page=20?page=${payload.page}&filter=${payload.filter}`).then(res =>{
          resolve(res.data)
          commit("loading", false)
          commit("getLibrary", res.data.data)
        }).catch(err =>{
          reject(err)
          commit("loading", false)
        })
      })
    },
    getBookType({commit}){
      return new Promise((resolve, reject)=>{
        axios.get(config.apiUrl + `book-type`).then(res =>{
          commit("getBookType", res.data.data)
          resolve(res.data)
        }).catch(err =>{
          reject(err)
        })
      })
    },
    getBookById({commit}, payload){
      return new Promise((resolve, reject) =>{
        axios.get(config.apiUrl + `book/b_id=${payload}`).then(res =>{
          resolve(res.data)
        }).catch(err =>{
          reject(err)
        })
      })
    }
  }
}
