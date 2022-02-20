<template>
  <div class="p-5 relative">
    <div class="flex items-center justify-center w-full h-screen relative" v-if="loading">
      <LoadingIndicator></LoadingIndicator>
    </div>
    <div v-else>
      <div class="flex text-white relative z-40">
        <div class="px-5 py-2 cursor-pointer hover:bg-tertiary"
             @click="switchNews(index)"
             :class="active == index?`index${index} bg-tertiary`:`bg-primary index${index}`"
             v-for="(ct, index) in news"
             :key="index">
          {{ ct.title }}
        </div>
      </div>

      <div class="mt-5 h-screen overflow-y-scroll" @scroll="onScroll">
        <div v-if="loadingNews" class="flex items-center justify-center h-full">
          <LoadingIndicator></LoadingIndicator>
        </div>
        <div v-if="newByCat.length <= 0" class="flex items-center justify-center h-full absolute top-0 left-0 w-full z-10">
          <Empty></Empty>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div v-for="(info, index) in newByCat" :key="index" class="bg-forest rounded-xl p-5 shadow cursor-pointer">
            <div class="flex justify-between" @click="read(info.id)">
              <div class="mr-5">
                <div class="text-primary">{{ cutString(info.newsTitle, 50) }}</div>
                <div v-html="cutString(info.longDetails, 200)"></div>
                <div class="mt-3 text-gray-500 text-sm">
                  {{ getDateFormat(info.posted) }}
                </div>
              </div>
              <div class="w-40 h-40">
                <div class="w-40 h-40 rounded-xl bg-cover bg-center"
                     :style="{backgroundImage:`url(${info.photo})`}"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-56" v-if="newByCat.length"></div>
      </div>
    </div>
    <template v-if="isDetail">
      <Details @close="()=>{this.isDetail = false}"></Details>
    </template>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator'
import { mapState, mapActions } from 'vuex'
import helper from '@/helper'
import dateFormat from '@/helper/dateFormat'
import Empty from '@/components/Empty'
import Details from '@/views/News/components/Details'

export default {
  name: 'News',
  components: {
    LoadingIndicator,
    Empty,
    Details
  },
  data () {
    return {
      loading: false,
      loadingNews: false,
      isDetail: false,
      active: 0,
      payload: {
        page: 1,
        cat_id: 1,
      }
    }
  },
  computed: {
    ...mapState('news', ['news', 'newByCat'])
  },
  methods: {
    ...mapActions('news', ['getNewsByCat', 'getNews', 'getDetail']),
    read (id) {
      this.getDetail(id).then(() => {
        this.isDetail = true
      })
    },
    getDateFormat (timestamp) {
      return dateFormat.formatDate(timestamp, 'km')
    },
    cutString (text, limit) {
      return helper.cutString(text, limit)
    },
    switchNews (index) {
      this.payload.page = 1
      this.active = index
      this.listNews()
    },
    onScroll ({
      target: {
        scrollTop,
        clientHeight,
        scrollHeight
      }
    }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.payload.page++
        this.listNews()
      }
    },
    listNews () {
      this.loadingNews = true
      this.payload.cat_id = this.news[this.active].id
      this.getNewsByCat(this.payload).then(() => {
        this.loadingNews = false
      })
    },
    getNew () {
      this.loading = true
      this.getNews().then(() => {
        this.loading = false
        this.listNews()
      })
    }
  },
  created () {
    this.getNew()
  }
}
</script>

<style scoped>
.index0 {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.index1 {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
