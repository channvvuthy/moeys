import Vue from 'vue'
import VueRouter from 'vue-router'
import SplashScreen from '../views/SplashScreen/index.vue'
import Home from "../views/Home/Home.vue"
import Login from "../views/User/Login.vue"
import Help from "../views/Help/Help.vue"
import VerifyOtp from "../views/User/components/VerifyOtp.vue"
import Lesson from "../views/Course/Lesson.vue"
import Video from "../views/Course/Video.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SplashScreen',
    component: SplashScreen
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/verify-otp/:phone',
    name: 'VerifyOtp',
    component: VerifyOtp
  },
  {
    path: '/lesson/:subject_title/:chapter_id/:chapter',
    name: 'Lesson',
    component: Lesson
  },
  {
    path: '/watch/:vidId',
    name: 'Watch',
    component: Video
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
