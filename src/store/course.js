import axios from "axios"
import config from "./../../config"
import helper from "./../helper/index"
export default {
    namespaced: true,
    state: {
        loading: false,
        subjects:[],
        chapters:[],
        lessons: [],
        search: [],
        loadingSearch: false
    },
    mutations: {
        fetchingSubject(state, payload){
            state.loading = payload
        },
        receivedSubject(state, payload){
            state.subjects = payload
        },
        receivedChapter(state, payload){
            state.chapters = payload
        },
        receivedLesson(state, payload){
            state.lessons = payload
        },
        fetchingSearch(state, payload){
            state.loadingSearch = payload
        },
        receivedSearch(state, payload){
            state.search = payload
        },

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
       },
        getSearch({commit}, payload){
            commit("fetchingSearch", true)
            return new Promise((resolve, reject) =>{
                axios.get(config.apiUrl + `search/type=2/keyword=${payload}`).then(res =>{
                    commit("fetchingSearch", false)
                    commit("receivedSearch", res.data.data)
                    resolve(res)
                }).catch(err =>{
                    commit("fetchingSearch", false)
                    reject(err)
                })
            })
        },
       getChapter({commit}, payload){
        return new Promise((resolve, reject) =>{
            axios.get(config.apiUrl + `chapter/subject_id=${payload.subject_id}?${helper.q(payload)}`).then(res =>{
                    commit("receivedChapter", res.data.data)
                    resolve(res)
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        getLesson({commit}, payload){
            return new Promise((resolve, reject) =>{
                axios.get(config.apiUrl + `lesson/chapter_id=${payload}`).then(res =>{
                    commit("receivedLesson", res.data.data)
                    resolve(res)
                }).catch(err =>{
                    reject(err)
                })
            })
        },
    },

}