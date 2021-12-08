export default {
    namespaced: true,
    state: {
       sidebarWidth:300,
    },
    mutations: {
        setWidth(state, payload){
            state.sidebarWidth = payload
        }
    }
}