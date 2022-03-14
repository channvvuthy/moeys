<template>
  <div class="detail flex items-center justify-center fixed w-full h-full z-50 bg-black bg-opacity-80 left-0 top-0">
    <div class="w-1/2 bg-white rounded-xl shadow relative">
      <div class="h-12 flex items-center px-5 border-b">
        <div class="text-lg font-bold">ពត៍មានលំអិត</div>
        <div class="w-7 h-7 rounded-full bg-forest flex items-center justify-center cursor-pointer
absolute -right-2 -top-4"
             @click="()=>{this.$emit('close')}">
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div style="max-height: 38rem;" class="overflow-y-scroll p-5 custom-scroll">
        <div class="text-lg mb-2">
          {{ details.newsTitle }}
        </div>
        <div>
          <img :src="details.photo" class="rounded-xl">
        </div>
        <div class="mt-3 text-gray-500 text-sm mb-3">
          {{ getDateFormat(details.posted) }}
        </div>
        <div v-html="details.longDetails" class="mb-3"></div>
        <div class="text-xl font-bold mb-3" v-if="details.videos && details.videos.length">វីដេអូ</div>
        <div v-for="(video, index) in details.videos" :key="index" class="mb-3 video">
          <div v-html="video.url"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import { mapState } from 'vuex'
import dateFormat from '@/helper/dateFormat'

export default {
  components: {
    CloseIcon
  },
  computed: {
    ...mapState('news', ['details'])
  },
  methods: {
    getDateFormat (timestamp) {
      return dateFormat.formatDate(timestamp, 'km')
    },
  }
}
</script>

<style>
iframe {
  width: 100% !important;
  margin: 10px 0px;
  min-height: 400px !important;
}
.detail img{
  max-width: 100% !important;
  height: auto !important;
  margin:10px auto;
}
</style>
