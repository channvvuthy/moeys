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
import Support from '@/views/Help/Support'
import Using from '@/views/User/components/Using'
import Schedule from '@/views/Schedule/Schedule'
import SwitchAccount from '@/views/SwitchAccount/SwitchAccount'
import History from '@/views/History/History'
import Test from '@/views/Test/Test'
import Graph from '@/views/Graph/Graph'
import refreshGraph from '@/views/Graph/refreshGraph'
Vue.use(VueRouter)
const routes = [

  {
    path: '/',
    name: 'SplashScreen',
    component: SplashScreen
  },
  {
    path: '/switch-account',
    name: 'SwitchAccount',
    component: SwitchAccount
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: History
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
  },
  {
    path: '/support',
    name: 'Support',
    component: Support
  },
  {
    path: '/usage',
    name: 'Usage',
    component: Using
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/graph',
    name: 'Graph',
    component: Graph
  },
  {
    path: '/refreshGraph',
    name: 'refreshGraph',
    component: refreshGraph
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
