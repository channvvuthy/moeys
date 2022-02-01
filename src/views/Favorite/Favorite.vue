<template>
  <div class="p-5 bg-forest h-full">
    <div class="flex text-white">
      <div class="px-5 py-2 cursor-pointer hover:bg-tertiary rounded-l"
           :class="active == 1?`bg-tertiary`:`bg-primary`" @click="switchMenu(1)">វីដេអូ</div>
      <div class="px-5 py-2 cursor-pointer hover:bg-tertiary rounded-r"
           :class="active == 2?`bg-tertiary`:`bg-primary`" @click="switchMenu(2)">សៀវភៅ</div>
    </div>
    <div class="flex items-center justify-center h-full w-full" v-if="loading">
      <LoadingIndicator></LoadingIndicator>
    </div>
    <!-- Video favorite -->
    <div v-if="active == 1" class="my-5">
      <div class="grid grid-cols-4 gap-5 ">
        <div v-for="(lesson, index) in favorites" :key="index" class="rounded-md bg-white shadow cursor-pointer overflow-hidden">
          <div class="relative font-normal" @click="()=>{$router.push({name:'Watch',params:{vidId:lesson.vId}})}">
            <img :src="lesson.lessonThumbnail">
          </div>
          <div class="px-2 pb-3 mt-3 flex items-center justify-between">
            <div class="text-sm">{{lesson.lessonTitle}}</div>
              <div @click="confirmDelete(lesson.markId)">
                <DeleteIcon :size="20"></DeleteIcon>
              </div>
          </div>
        </div>
      </div>
    </div>
    <!-- No result -->
    <div v-if="!favorites.length" class="flex items-center justify-center h-full w-full flex-col">
      <NoResultIcon></NoResultIcon>
    </div>
    <!-- Confirm delete -->
    <template v-if="isConfirm">
      <Confirm @closeMessage="()=>{this.isConfirm = false}" @delete="deleteFavorite"></Confirm>
    </template>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import DeleteIcon from '@/components/DeleteIcon'
import LoadingIndicator from '@/components/LoadingIndicator'
import Confirm from '@/components/Message/Confirm'
import NoResultIcon from '@/components/Empty'

export default {
  components:{
    DeleteIcon,
    LoadingIndicator,
    Confirm,
    NoResultIcon
  },
  data(){
    return{
      active: 1,
      loading: false,
      isConfirm: false,
      deleteId: null
    }
  },
  computed:{
    ...mapState('favorite', ['favorites'])
  },
  methods:{
    ...mapActions('favorite', ['getVideoFavorite', 'getBookFavorite','removeFavorite']),
    switchMenu(active){
      this.loading = true
      this.active = active
      if(active == 1){
        this.getVideoFavorite().then(()=>{
          this.loading = false
        })
      }else{
        this.getBookFavorite().then(()=>{
          this.loading = false
        })
      }
    },
    deleteFavorite () {
      this.removeFavorite(this.deleteId).then(()=>{
        this.isConfirm = false
        this.getMyVideoFavorite()
      })
    },
    confirmDelete(deleteId){
      this.deleteId = deleteId
      this.isConfirm = true
    },
    getMyVideoFavorite(){

      this.loading = true
      this.getVideoFavorite().then(()=>{
        this.loading = false
      })
    }
  },

  created () {
    this.getMyVideoFavorite()
  }
}
</script>
