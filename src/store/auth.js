import axios from "axios"
import config from "./../../config"
export default {
    namespaced: true,
    state: {
        loading: false,
        isForgotPassword: false,
        auth: {},
        token: localStorage.getItem("token")
    },
    mutations: {
        getToken(state){
            state.token = localStorage.getItem("token")
        },
        setVisibleForgotPassword(state, payload){
            state.isForgotPassword = payload
        },
        loading(state, payload){
            state.loading = payload
        },
        receivedAuth(state, payload){
            state.auth = payload
        }
    },

    actions: {
        login({commit}, payload){
            commit("loading", true)
            return new Promise((resolve, reject)=>{
                axios.post(config.apiUrl + `login`,payload).then(res =>{
                    commit("receivedAuth", res.data.data)
                    commit("loading", false)
                    resolve(res.data.data)
                }).catch(err =>{
                    commit("loading", false)
                    reject(err)
                })
            })
        },
       
        sendOtp({}, payload){
            return new Promise((resolve, reject)=>{
                axios.post(config.apiUrl + `otp-reset-password`,payload).then(res =>{
                    resolve(res.data.data)
                }).catch(err =>{
                    reject(err)
                })
            })
       },

       verifyOtp({}, payload){
           return new Promise((resolve, reject) =>{
               axios.post(config.apiUrl + `otp-reset-password-verification`, payload).then(res =>{
                   resolve(res.data.data)
               }).catch(err =>{
                   reject(err)
               })
           })
       },

       resetPassword({}, payload){
           return new Promise((resolve, reject) =>{
               axios.post(config.apiUrl + `reset-password`, payload).then(res =>{
                   resolve(res.data.data)
               }).catch(err =>{
                   reject(err)
               })
           })
       }

    }

}