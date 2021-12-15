import axios from "axios"
import config from "./../../config"
export default {
    namespaced: true,
    state: {
        loading: false,
        comments:[]
    },
    mutations: {
        fetchingComment(state, payload){
            state.loading = payload
        },
        receivedComment(state, payload){
            state.comments = payload
        },
        receivedCommentPagination(state, payload){
            if(payload.data.length){
                for(let i = 0; i < payload.data.length; i ++){
                    state.comments.data.push(payload.data[i])
                }
            }
        }

    },

    actions: {
       getComment({commit},payload){
           commit("fetchingComment", true)
           return new Promise((resolve, reject) =>{
               axios.get(config.apiUrl + `comment/less_id=${payload.less_id}/per_page=${payload.per_page}?page=${payload.page}`).then(res =>{
                   commit("fetchingComment", false)
                   if(payload.page > 1){
                    commit("receivedCommentPagination", res.data.data)
                   }else{
                    commit("receivedComment", res.data.data)
                   }
                   resolve(res)
               }).catch(err =>{
                   commit("fetchingComment", false)
                   reject(err)
               })
           })
       }
    },

}