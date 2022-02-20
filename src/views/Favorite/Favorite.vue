<template>
  <div class="p-5 bg-forest h-full">
    <div class="flex text-white">
      <div class="px-5 py-2 cursor-pointer hover:bg-tertiary rounded-l"
           :class="active == 1?`bg-tertiary`:`bg-primary`" @click="switchMenu(1)">វីដេអូ</div>
      <div class="px-5 py-2 cursor-pointer hover:bg-tertiary rounded-r"
           :class="active == 2?`bg-tertiary`:`bg-primary`" @click="switchMenu(2)">សៀវភៅ</div>
    </div>
    <div class="flex items-center justify-center w-full h-full" v-if="loading">
      <LoadingIndicator></LoadingIndicator>
    </div>
    <div class="h-screen overflow-y-scroll custom-scroll" v-if="(!loading && favorites.length)">
      <!-- Video favorite -->
      <div v-if="active == 1" class="my-5">
        <div class="grid grid-cols-4 gap-5 ">
          <div v-for="(lesson, index) in favorites" :key="index" class="rounded-md bg-white shadow cursor-pointer overflow-hidden">
            <div class="relative font-normal" @click="()=>{$router.push({name:'Watch',params:{vidId:lesson.vId}})}">
              <img :src="lesson.lessonThumbnail">
            </div>
            <div class="px-2 pb-3 mt-3 flex items-center justify-between">
              <div class="text-sm">{{cutString(lesson.lessonTitle,25)}}</div>
                <div @click="confirmDelete(lesson.markId)">
                  <DeleteIcon :size="20"></DeleteIcon>
                </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Book favorite -->
      <div v-if="active == 2" class="my-5">
        <div class="grid grid-cols-4 gap-5 ">
          <div v-for="(lesson, index) in favorites"
               :key="index" class="rounded-md bg-white shadow cursor-pointer overflow-hidden">
            <div class="relative font-normal">
              <img :src="lesson.bookCover" class="m-auto" @click="viewPdf(lesson.bookPDF,lesson.bookTitle)">
            </div>
            <div class="px-2 pb-3 mt-3 flex items-center justify-between">
              <div class="text-sm" @click="viewPdf(lesson.bookPDF,lesson.bookTitle)">{{cutString(lesson.bookTitle, 25)}}</div>
              <div @click="confirmDelete(lesson.markId)">
                <DeleteIcon :size="20"></DeleteIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-40"></div>
    </div>
    <!-- No result -->
    <div  class="flex items-center justify-center h-full" v-else>
      <div class="pb-40">
        <NoResultIcon></NoResultIcon>
      </div>
    </div>
    <!-- Confirm delete -->
    <template v-if="isConfirm">
      <Confirm @closeMessage="()=>{this.isConfirm = false}" @delete="deleteFavorite"></Confirm>
    </template>
    <!-- Pdf viewer -->
    <template v-if="isPdf">
      <Pdf :pdf-url="pdfUrl" :title="bookTitle" @closePdf="()=>{this.isPdf = false;}"></Pdf>
    </template>
  </div>
</template>
]
<script>
import {mapActions, mapState} from 'vuex'
import DeleteIcon from '@/components/DeleteIcon'
import LoadingIndicator from '@/components/LoadingIndicator'
import Confirm from '@/components/Message/Confirm'
import NoResultIcon from '@/components/Empty'
import helper from '@/helper'
import Pdf from '@/components/Pdf/Pdf'

export default {
  components:{
    DeleteIcon,
    LoadingIndicator,
    Confirm,
    NoResultIcon,
    Pdf
  },
  data(){
    return{
      active: 1,
      loading: false,
      isConfirm: false,
      deleteId: null,
      isPdf: false,
      pdfUrl: "",
      bookTitle: ""
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
        this.$store.commit("favorite/removeFavorite", this.deleteId)
      })
    },
    viewPdf(pdfUrl,bookTitle){
      this.isPdf = true
      this.pdfUrl = pdfUrl
      this.bookTitle = bookTitle

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
    },
    cutString(text, limit){
      if(text){
        return helper.cutString(text, limit)
      }
      return  ''
    }
  },

  created () {
    this.getMyVideoFavorite()
  }
}
</script>
