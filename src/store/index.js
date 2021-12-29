import Vue from 'vue'
import Vuex from 'vuex'
import help from "./help"
import instruction from "./instruction"
import auth from "./auth"
import layout from "./layout"
import term from "./term"
import helper from "./helper"
import course from "./course"
import video from "./video"
import comment from "./comment"
import favorite from "./favorite"

Vue.use(Vuex);
export default  new Vuex.Store({
    modules: {
      help,
      instruction,
      auth,
      layout,
      term,
      helper,
      course,
      video,
      comment,
      favorite
    }
});