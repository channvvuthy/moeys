<template>
  <div class="h-16 shadow flex justify-between items-center px-5 relative" :style="{width:screenWidth + `px`}">
    <div class="cursor-pointer" @click="toggleSidebar">
      <NavigationIcon></NavigationIcon>
    </div>
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center justify-between px-5 w-72 text-sm">
        <div class="cursor-pointer flex flex-col items-center justify-center" @click="goTo('Home')">
          <HomeIcon :size="25" :fill="$route.name == `Home`?`#174B7C`:`#000`"></HomeIcon>
          <div class="mt-1 font-bold" :class="$route.name == `Home`?`text-primary`:``">
            ទំព័រដើម
          </div>
        </div>
        <div class="cursor-pointer flex flex-col items-center justify-center"  @click="goTo('Library')">
          <LibrayIcon :size="25" :fill="$route.name == `Library`?`#174B7C`:`#000`"></LibrayIcon>
          <div class="mt-1 font-bold" :class="$route.name == `Library`?`text-primary`:``">
            បណ្ណាល័យ
          </div>
        </div>
        <div class="cursor-pointer flex flex-col items-center justify-center"  @click="goTo('Test')">
          <NoteIcon fill="#000" :size="25" :fill="$route.name == `Test`?`#174B7C`:`#000`"></NoteIcon>
          <div class="mt-1 font-bold" :class="$route.name == `Test`?`text-primary`:``">
            តេស្ត
          </div>
        </div>
        <div class="cursor-pointer flex flex-col items-center justify-center" @click="goTo('News')">
          <NewsIcon :size="25" :fill="$route.name == `News`?`#174B7C`:`#000`"></NewsIcon>
          <div class="mt-1 font-bold" :class="$route.name == `News`?`text-primary`:``">
            ពត៍មាន
          </div>
        </div>

      </div>
      <div class="flex items-center justify-end">
        <div class="cursor-pointer" v-if="!isSearch" @click="showSearch">
          <SearchIcon></SearchIcon>
        </div>
        <div class="relative" v-else>
          <div class="absolute right-2 top-1 cursor-pointer" style="margin-top:2px;" @click="showSearch">
            <CloseIcon :height="20"></CloseIcon>
          </div>
          <input type="text" class="border rounded-full text-sm px-3 outline-none h-8 w-60" v-model="keyword"
                 placeholder="ស្វែងរក មេរៀន" @keyup="exploreLesson">
        </div>
        <div class="mx-7 cursor-pointer" @click="goToGraph">
          <GraphIcon></GraphIcon>
        </div>
        <div class="cursor-pointer" @click="()=>{this.isNotification = true}">
          <NotificationIcon></NotificationIcon>
        </div>
      </div>
    </div>
    <!-- Box result -->
    <template v-if="isSearch">
      <div class="absolute w-96 bg-white h-96 rounded-lg shadow right-32 top-17 box-result z-50" v-if="keyword">
        <div class="flex items-center justify-center h-96" v-if="loadingSearch">
          <div>
            <LoadingIndicator></LoadingIndicator>
          </div>
        </div>
        <template v-else>
          <ul class="overflow-y-scroll h-96 py-3" v-if="search.length">
            <li v-for="(result, index) in search" :key="index" class="text-sm py-2 px-3 border-b cursor-pointer"
                @click="searchDetail(result.id)">
              <p>{{ result.title }}</p>
            </li>
          </ul>
          <div v-else class="flex flex-col items-center justify-center h-96">
            <div>
              <NoResultIcon :size="50" fill="#6b7280"></NoResultIcon>
            </div>
            <div class="text-lg text-gray-500 font-mono">
              ពុំទាន់មានទិន្នន័យ
            </div>
          </div>
        </template>
      </div>
    </template>
    <!-- Notification -->
    <template v-if="isNotification">
      <Notification @closeNotification="()=>{this.isNotification = false}"></Notification>
    </template>
  </div>
</template>
<script>
import NavigationIcon from './../NavigationIcon.vue'
import NotificationIcon from './../NotificationIcon.vue'
import NoResultIcon from './../NoResultIcon.vue'
import LoadingIndicator from './../LoadingIndicator.vue'
import SearchIcon from './../SearchIcon.vue'
import GraphIcon from './../GraphIcon.vue'
import CloseIcon from './../CloseIcon.vue'

import { mapState, mapActions } from 'vuex'
import Notification from '@/components/Notification/Notification'
import HomeIcon from '@/components/HomeIcon'
import LibrayIcon from '@/components/LibrayIcon'
import NewsIcon from '@/components/NewsIcon'
import NoteIcon from '@/components/NoteIcon'

export default {
  components: {
    NavigationIcon,
    SearchIcon,
    NotificationIcon,
    GraphIcon,
    CloseIcon,
    LoadingIndicator,
    NoResultIcon,
    Notification,
    HomeIcon,
    LibrayIcon,
    NewsIcon,
    NoteIcon
  },
  data () {
    return {
      screenWidth: null,
      oldScreenWidth: null,
      isSearch: false,
      keyword: '',
      isNotification: false,
    }
  },
  computed: {
    ...mapState('layout', ['sidebarWidth', 'screenHeight']),
    ...mapState('course', ['search', 'loadingSearch'])
  },
  methods: {
    ...mapActions('course', ['getSearch']),
    goTo (name) {
      this.$router.push({ name }).catch(() => {
      })
    },
    goToGraph () {
      this.$router.push({
        name: 'Graph'
      })
    },
    exploreLesson () {
      if (this.keyword) {
        this.getSearch(this.keyword)
      }
    },
    searchDetail (vidId) {
      this.$router.push({
        name: 'Search',
        params: { vidId: vidId }
      })
      this.showSearch()
    },
    showSearch () {
      this.isSearch = !this.isSearch
    },
    handleResize () {
      this.screenWidth = window.innerWidth
      this.oldScreenWidth = window.innerWidth
      this.$store.commit('layout/setScreenWidth', this.screenWidth)
    },
    toggleSidebar () {
      if (this.sidebarWidth == 0) {
        this.$store.commit('layout/setWidth', 300)
        this.screenWidth = parseInt(this.screenWidth) - 300
      } else {
        this.$store.commit('layout/setWidth', 0)
        this.screenWidth = this.oldScreenWidth
      }
      this.$store.commit('layout/setScreenWidth', this.screenWidth)
    }
  },
  created () {
    this.toggleSidebar()
    this.handleResize()
  }
}
</script>
<style>
.box-result:after {
  content: "";
  position: absolute;
  top: 0;

  right: 25px;
  width: 0;
  height: 0;
  border-color: white;
  margin-top: -30px;
  border-width: 15px;
  transform: rotate(-90deg);
  border-bottom-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  /* bord */

}
</style>
