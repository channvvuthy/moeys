import Vue from 'vue'
import Vuex from 'vuex'
import help from './help'
import instruction from './instruction'
import auth from './auth'
import layout from './layout'
import term from './term'
import helper from './helper'
import course from './course'
import video from './video'
import comment from './comment'
import favorite from './favorite'
import library from './library'
import about from './about'
import feedback from './feedback'
import notification from './notification'
import schedule from '@/store/schedule'
import user from './user'
import history from '@/store/history'

Vue.use(Vuex)
export default new Vuex.Store({
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
    favorite,
    library,
    about,
    feedback,
    notification,
    schedule,
    user,
    history
  }
})
