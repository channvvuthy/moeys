<template>
  <div class="fixed flex items-center justify-center w-full h-full z-50 bg-black bg-opacity-90 left-0 top-0 ">
    <div class="w-1/2 rounded-xl shadow bg-white relative">
      <div class="w-8 h-8 cursor-pointer rounded-full flex items-center justify-center shadow absolute -right-2 -top-4 bg-forest"
      @click="()=>{this.$emit('closeNotification')}"
      >
        <CloseIcon></CloseIcon>
      </div>
      <div class="h-12 flex items-center border-b px-5 text-lg font-black">សារជូនដំណឹង</div>
      <div v-if="loading" class="h-full w-full flex items-center justify-center">
        <LoadingIndicator></LoadingIndicator>
      </div>
      <div class="overflow-y-scroll" @scroll="onScroll" style="height: 36rem;" v-else>
        <div v-for="(notification, index) in notifications" class="py-3 px-5" :key="index" :class="index < (notifications.length - 1) ?`border-b`: ``">
          <div class="flex cursor-pointer" @click="detail(notification.notifyLink,notification.notify_type)">
            <div class="w-20">
                <div class="flex items-center justify-center bg-primary w-14 h-14 rounded-full">
                  <NotificationIcon fill="#FFF" :size="40"></NotificationIcon>
              </div>
            </div>
            <div class="ml-5 w-full">
              <div class="text-xl">
                {{cutString(notification.notifyTitle,60)}}
              </div>
              <div class="text-base">
                {{cutString(notification.notifyBody,150)}}
              </div>
              <div class="flex justify-end">
                <div>
                  <div class="ml-2 text-sm mt-3 text-gray-600 whitespace-nowrap">
                    {{getDateFormat(notification.notifyDate)}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Detail -->
    <template v-if="isDetails" >
      <NotificationDetail @closeNotificationDetail="()=>{this.isDetails = false}" :notifyId="notifyId"></NotificationDetail>
    </template>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import { mapActions, mapState } from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import NotificationIcon from '@/components/NotificationIcon'
import helper from '@/helper'
import dateFormat from '@/helper/dateFormat'
import NotificationDetail from '@/components/Notification/NotificationDetail'
export default {
  components:{
    NotificationDetail,
    CloseIcon,
    LoadingIndicator,
    NotificationIcon
  },
  data(){
    return{
      page: 1,
      isDetails: false,
      notifyId: null
    }
  },
  computed:{
    ...mapState('notification', ['loading', 'notifications'])
  },
  methods:{
    ...mapActions('notification', ['getNotifications', 'getPagination', 'getDetail', 'getNewsDetail']),
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight}}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.page++
        this.getPagination(
          {page: this.page}
        )
      }
    },
    cutString(text, limit){
      return helper.cutString(text, limit)
    },
    getDateFormat(timestamp){
      return dateFormat.formatDate(timestamp,"km")
    },
    detail(notifyLink,notify_type){
      let notifyId = notifyLink.split('=')[1]
      if(notify_type == 2){
        this.getDetail(notifyId).then(()=>{
          this.isDetails = true
        })
      }
      if(notify_type == 3){
        this.getNewsDetail(notifyId).then(()=>{
          this.isDetails = true
        })
      }

    },
  },
  mounted () {
    this.getNotifications({
      page: this.page
    })
  }
}
</script>
