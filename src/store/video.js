import axios from "axios"
import config from "./../../config"
export default {
    namespaced: true,
    state: {
        loading: false,
        videos:[]
    },
    mutations: {
        fetchingVideo(state, payload){
            state.loading = payload
        },
        receivedVideo(state, payload){
            state.videos = payload
        }

    },

    actions: {
       getVideo({commit},payload){
           commit("fetchingVideo", true)
           return new Promise((resolve, reject) =>{
               axios.get(config.apiUrl + `watch/vidId=${payload}`).then(res =>{
                   commit("fetchingVideo", false)
                   commit("receivedVideo", res.data.data)
                   resolve(res)
               }).catch(err =>{
                   commit("fetchingVideo", false)
                   reject(err)
               })
           })
       }
    },

}