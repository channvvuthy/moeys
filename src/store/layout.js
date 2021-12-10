export default {
    namespaced: true,
    state: {
       sidebarWidth:300,
       screenWidth: 0,
       screenHeight: 0
    },
    mutations: {
        setWidth(state, payload){
            state.sidebarWidth = payload
        },
        setScreenWidth(state, payload){
            state.screenWidth = payload
        },
        setScreenHeight(state, payload){
            state.screenHeight = payload
        }
    }
}