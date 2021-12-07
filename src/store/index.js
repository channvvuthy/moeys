import Vue from 'vue'
import Vuex from 'vuex'
import help from "./help"
Vue.use(Vuex);
export default  new Vuex.Store({
    modules: {
      help
    }
});