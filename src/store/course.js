import axios from "axios"
import config from "./../../config"
import helper from "./../helper/index"
export default {
    namespaced: true,
    state: {
        loading: false,
        subjects:[]
    },
    mutations: {
        fetchingSubject(state, payload){
            state.loading = payload
        },
        receivedSubject(state, payload){
            state.subjects = payload
        }

    },

    actions: {
       getSubject({commit}, payload){
           commit("fetchingSubject", true)
           return new Promise((resolve, reject) =>{
               axios.get(config.apiUrl + `subject?${helper.q(payload)}`).then(res =>{
                   commit("fetchingSubject", false)
                   commit("receivedSubject", res.data.data)
                   resolve(res)
               }).catch(err =>{
                   commit("fetchingSubject", false)
                   reject(err)
               })
           })
       }
    },

}