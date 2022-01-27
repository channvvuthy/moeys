<template>
  <div class="p-5 bg-forest font-mono h-full">
    <div class="grid grid-cols-4 gap-5 ">
      <template v-if="videos.length">
        <div v-for="(lesson, index) in videos" :key="index" class="rounded-md bg-white shadow cursor-pointer overflow-hidden">
          <div class="relative font-normal" @click="()=>{$router.push({name:'DownloadDetail',params:{vId:lesson.vId}})}">
            <img :src="lesson.lessonThumbnail">
          </div>
          <div class="px-2 pb-3 mt-3 flex items-center justify-between">
            <div class="text-sm">{{lesson.lessonTitle}}</div>
            <div @click="confirmDelete(lesson.chap_id)">
              <DeleteIcon :size="20"></DeleteIcon>
            </div>
          </div>
        </div>
      </template>
    </div>
    <template v-if="videos.length === 0">
      <div class="flex items-center justify-center flex-col h-full">
        <NoResultIcon :size="100"></NoResultIcon>
        <div>មិនមានឯកសារ</div>
      </div>
    </template>
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
export default {
  name: 'Download',
  components: {
    DeleteIcon,
    Confirm,
    NoResultIcon
  },
  data(){
    return{
      videos: [],
      isConfirm: false,
      chap_id: null

    }
  },
  methods:{
    confirmDelete(chap_id){
      this.chap_id = chap_id
      this.isConfirm = true
    },
    deleteItem(){
      let videos = JSON.parse(localStorage.getItem('videos'));
      videos = videos.filter(item => item.chap_id != this.chap_id);
      this.videos = videos.filter((value, index, self) => self.findIndex((m) => m.chap_id === value.chap_id) === index);
      localStorage.setItem("videos", JSON.stringify(videos))
      this.isConfirm = false
    }
  },
  created () {
    let videos = localStorage.getItem("videos")
    if( videos !== '' || videos !== false){
      if(videos !== null){
        videos = JSON.parse(videos);
        videos = videos.filter((value, index, self) => self.findIndex((m) => m.chap_id === value.chap_id) === index)
        this.videos = videos
      }
    }
  }
}
</script>

<style scoped>

</style>
