import axios from "axios"
import config from "./../../config"
export default {
    namespaced: true,
    state: {
        loading: false,
        helps:{}
    },
    mutations: {
        fetchingHelp(state, payload){
            state.loading = payload
        },
        receivedHelp(state, payload){
            state.helps = payload
        }

    },

    actions: {
       getHelp({commit}){
           commit("fetchingHelp", true)
           return new Promise((resolve, reject) =>{
               axios.get(config.apiUrl + 'helps').then(res =>{
                   commit("fetchingHelp", false)
                   commit("receivedHelp", res.data.data)
                   resolve(res)
               }).catch(err =>{
                   commit("fetchingHelp", false)
                   reject(err)
               })
           })
       }
    },

}