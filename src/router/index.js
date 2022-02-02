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
import Favorite from '@/views/Favorite/Favorite'
import Library from '@/views/Library/Library'
import Comment from '@/views/Comment/Comment'
import About from '@/views/About/About'

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
    path: '/download-detail/:chap_id',
    name: 'DownloadDetail',
    component: DownloadDetail
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite
  },
  {
    path: '/library',
    name: 'Library',
    component: Library
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
