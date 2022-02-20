<template>
  <div class="fixed flex items-center justify-center w-full h-full z-50 bg-black bg-opacity-90 left-0 top-0 ">
    <div class="w-1/2 rounded-xl shadow bg-white relative">
      <div
        class="w-8 h-8 cursor-pointer rounded-full flex items-center justify-center shadow absolute -right-2 -top-4 bg-forest"
        @click="()=>{this.$emit('closeNotificationDetail')}"
      >
        <CloseIcon></CloseIcon>
      </div>
      <div class="h-12 flex items-center border-b px-5 text-lg font-black">ពត៍មានលំអិត</div>
      <div v-if="loading" class="h-full w-full flex items-center justify-center">
        <LoadingIndicator></LoadingIndicator>
      </div>
      <div class="overflow-y-scroll custom-scroll p-5" style="height: 36rem;" v-else >
        <div class="text-xl">{{details.notifyTitle || details.newsTitle}}</div>
        <div class="my-3">
          <img :src="details.notifyPhoto || details.photo" alt="">
        </div>
        <div>
          <div class="text-sm mb-1 text-gray-600 whitespace-nowrap">
            <div>
              {{getDateFormat(details.notifyDate || details.posted)}}
            </div>
          </div>
          <div v-html="details.notifyBody || details.longDetails"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import { mapActions, mapState } from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import NotificationIcon from '@/components/NotificationIcon'
import helper from '@/helper'
import dateFormat from '@/helper/dateFormat'

export default {
  components: {
    CloseIcon,
    LoadingIndicator,
    NotificationIcon
  },
  computed:{
    ...mapState('notification', ['details'])
  },
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    cutString (text, limit) {
      return helper.cutString(text, limit)
    },
    getDateFormat(timestamp){
      return dateFormat.formatDate(timestamp,"km")
    },
  },
}
</script>
