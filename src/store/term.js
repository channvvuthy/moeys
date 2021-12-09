import axios from "axios"
import config from "./../../config"
export default {
    namespaced: true,
    state: {
        loading: false,
        term:{}
    },
    mutations: {
        fetchingTerm(state, payload){
            state.loading = payload
        },
        receivedTerm(state, payload){
            state.term = payload
        }

    },

    actions: {
       getTerm({commit}){
           commit("fetchingTerm", true)
           return new Promise((resolve, reject) =>{
               axios.get(config.apiUrl + 'term-condition').then(res =>{
                   commit("fetchingTerm", false)
                   commit("receivedTerm", res.data.data)
                   resolve(res)
               }).catch(err =>{
                   commit("fetchingTerm", false)
                   reject(err)
               })
           })
       }
    },

}