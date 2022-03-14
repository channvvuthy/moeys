<template>
  <div class="pl-5 py-5 bg-white font-mono h-full">
      <div class="flex">
        <div class="left">
          <Offline :defaultUrl="videoUrl"></Offline>
          <div class="mt-5 pb-3">
            <div class="text-lg flex justify-between items-center">
              <div>
                <div>
                  {{lessonTitle }} {{lessonIsPart }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="font-mono font-semibold text-black">
            <div>
              <ul class="flex items-center h-11 text-sm border-b-4 border-primary">
                <li class="w-32 relative tab text-white cursor-pointer h-full flex items-center justify-center bg-primary">មេរៀនបន្ទាប់</li>
              </ul>
            </div>
            <ul class="mt-3 overflow-y-scroll pb-10 border custom-scroll" :style="{height:`${screenHeight}px`}">
              <li v-for="(video, index) in videos" :key="index" class="p-3 hover:bg-forest" :class="index == active?`bg-forest`:``">
                <div class="flex">
                  <div class="mr-3 cursor-pointer" @click="nextVideo(index,video)">
                    <img :src="video.lessonThumbnail" class="w-32">
                  </div>
                  <div class="text-sm w-full">
                    <div class="text-black cursor-pointer">{{ video.lessonTitle }}</div>
                    <div class="flex mb-3">
                      <div class="xs mt-1 text-gray-500 font-thin">
                        {{ video.lessonIsPart }}
                      </div>
                      <div class="xs mt-1 text-gray-500 ml-2">
                        រយៈពេល {{ video.lessonDuration  }}នាទី
                      </div>
                    </div>
                    <div class="w-full h-1 relative" :style="{background:`${percentage(video.percentages)}`}">
                      <div class="absolute right-0 -top-5 text-xs text-gray-500" v-if="video.percentages">
                        {{ video.percentages }}%
                      </div>
                    </div>
                  </div>
                </div>
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    <!-- Confirm message -->
    <template v-if="isConfirm">
      <Confirm @closeMessage="()=>{this.isConfirm = false}" @delete="deleteItem"></Confirm>
    </template>
  </div>
</template>

<script>
import DeleteIcon from '@/components/DeleteIcon'
import Confirm from '@/components/Message/Confirm'
import NoResultIcon from '@/components/NoResultIcon'
const {ipcRenderer} = require('electron')
import Offline from '@/components/Video/Offline'
import { mapState } from 'vuex'
export default {
  components: {
    DeleteIcon,
    Confirm,
    NoResultIcon,
    Offline
  },
  data(){
    return{
      videos: [],
      isConfirm: false,
      chap_id: null,
      baseUrl: '',
      videoUrl: '',
      active: 0,
      lessonTitle: '',
      lessonIsPart: '',
      isNex: ''


    }
  },
  computed:{
    ...mapState('layout', ['screenHeight']),
  },
  methods:{
    percentage (percentage) {
      if (percentage == null) {
        percentage = 0
      }
      return `linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(229, 231, 235) 0%)`
    },
    confirmDelete(chap_id){
      this.chap_id = chap_id
      this.isConfirm = true
    },
    deleteItem(){

    },
    nextVideo(index, video){
      this.active = index
      this.videoUrl = this.baseUrl + `/${video.vId}`
      this.lessonTitle = video.lessonTitle
      this.lessonIsPart = video.lessonIsPart
    }
  },

  mounted () {
    ipcRenderer.on("getPath",(event,arg)=>{
      this.baseUrl = `file:///${arg}`
      this.videoUrl = `file:///${arg}`
      let videos = localStorage.getItem("videos")
      if( videos !== '' || videos !== false){
        if(videos !== null){
          videos = JSON.parse(videos);
          let chap_id = this.$route.params.chap_id
          videos = videos.filter(item=> item.chap_id = chap_id).
          filter((value, index, self) => self.findIndex((m) => m.vId === value.vId) === index)
          this.videos = videos
          this.videoUrl += `/${this.videos[0]['vId']}`
          this.lessonTitle = this.videos[0].lessonTitle
          this.lessonIsPart = this.videos[0].lessonIsPart
        }
      }
      ipcRenderer.removeAllListeners()
    })

  },
  created () {
    ipcRenderer.send("getPath")
  }
}
</script>

<style>
.left{
  width: 69%;
  margin-right: 1%;
}
.right{
  width:30%;
}
.xs{
  font-size:10px;
}
.tab:after{
  content: "";
  position: absolute;
  right:-40px;
  border-color:#174B7C;
  border-width:20px;
  border-top-color: transparent;
  border-right-color: transparent;
}
</style>

