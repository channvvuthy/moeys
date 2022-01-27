import Vue from 'vue'
import VueRouter from 'vue-router'
import SplashScreen from '../views/SplashScreen/index.vue'
import Home from '../views/Home/Home.vue'
import Login from '../views/User/Login.vue'
import Help from '../views/Help/Help.vue'
import VerifyOtp from '../views/User/components/VerifyOtp.vue'
import Lesson from '../views/Course/Lesson.vue'
import Video from '../views/Course/Video.vue'
import Search from '../views/Search/Search.vue'
import Download from '@/views/Download/Download'
import DownloadDetail from '@/views/Download/DownloadDetail'

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
    path: '/search/:vidId',
    name: 'Search',
    component: Search
  },
  {
    path: '/download',
    name: 'Download',
    component: Download
  },
  {
    path: '/download-detail/:vId',
    name: 'DownloadDetail',
    component: DownloadDetail
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
