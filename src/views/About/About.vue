<template>
  <div>
    <div v-if="loading" class="h-screen w-full flex items-center justify-center">
      <LoadingIndicator></LoadingIndicator>
    </div>
    <div v-else class="p-5 h-screen pb-40 overflow-y-scroll px-10">
      <div class="flex justify-center">
        <img src="/logo/Moeys.png" class="w-24">
      </div>
      <br>
      <p v-html="about.short_desc" style="white-space: pre-line" class="text-sm">
      </p>
      <ul class="mt-5 text-gray-500 text-sm">
        <li class="flex items-center mb-3"><MarkerIcon></MarkerIcon> <p class="mx-2">{{about.address}}</p>
          <a :href="`http://www.google.com/maps/place/${about.map_latitude},${about.map_longitude}`"
             target="_blank"
             class="text-blue-600 font-black cursor-pointer">មើលផែនទី</a>
        </li>
        <li class="flex items-center mb-3"><PhoneIcon></PhoneIcon> <p class="ml-2">{{about.phone}}</p></li>
        <li class="flex items-center mb-3"><MailIcon></MailIcon> <p class="ml-2">{{about.email}}</p></li>
        <li class="flex items-center mb-3"><WebIcon></WebIcon> <a class="ml-2 text-blue-600" :href="about.website" target="_blank">{{about.website}}</a></li>

      </ul>
      <div class="text-gray-600 flex items-center justify-center">
        <div class="flex">
          <div>
            <div>
              សហការរៀបចំដោយ
            </div>
            <div>
              <img src="/logo/UYFC.png" class="w-24 mt-3">
            </div>
          </div>
          <div class="mx-10 border-l border-gray-600 h-10"></div>
          <div>
            <div>
              អភិវឌ្ឍដោយ
            </div>
            <div>
              <img src="/logo/eschool.png" class="w-24 mt-3">
            </div>
          </div>
        </div>
      </div>
      <div class="text-center text-gray-600 my-10 uppercase">
        Version {{appVersion}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import MarkerIcon from '@/components/MarkerIcon'
import PhoneIcon from '@/components/PhoneIcon'
import MailIcon from '@/components/MailIcon'
import WebIcon from '@/components/WebIcon'
import config from '../../../config'

export default {
  data(){
    return{
      appVersion: config.appVersion
    }
  },
  components:{
    LoadingIndicator,
    MarkerIcon,
    PhoneIcon,
    MailIcon,
    WebIcon
  },
  computed:{
    ...mapState('about', ['loading', 'about'])
  },
  methods:{
    ...mapActions('about', ['getAbout'])
  },
  created () {
    this.getAbout()
  }
}
</script>

<style scoped>

</style>
