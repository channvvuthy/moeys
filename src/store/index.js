import Vue from 'vue'
import Vuex from 'vuex'
import help from "./help"
import instruction from "./instruction"
import auth from "./auth"
import layout from "./layout"

Vue.use(Vuex);
export default  new Vuex.Store({
    modules: {
      help,
      instruction,
      auth,
      layout
    }
});