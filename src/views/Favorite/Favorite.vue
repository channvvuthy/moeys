<template>
  <div class="py-5 pl-5 bg-forest h-full">
    <div class="flex text-white">
      <div class="px-5 py-2 cursor-pointer hover:bg-tertiary rounded-l"
           :class="active == 1?`bg-tertiary`:`bg-primary`" @click="switchMenu(1)">វីដេអូ
      </div>
      <div class="px-5 py-2 cursor-pointer hover:bg-tertiary rounded-r"
           :class="active == 2?`bg-tertiary`:`bg-primary`" @click="switchMenu(2)">សៀវភៅ
      </div>
    </div>
    <div class="flex items-center justify-center w-full h-full" v-if="loading">
      <LoadingIndicator></LoadingIndicator>
    </div>
    <div class="h-screen overflow-y-scroll custom-scroll pr-5" v-if="(!loading && favorites.length)">
      <!-- Video favorite -->
      <div v-if="active == 1" class="my-5">
        <div class="grid grid-cols-4 gap-5 ">
          <div v-for="(lesson, index) in favorites" :key="index"
               class="rounded-md bg-white shadow cursor-pointer overflow-hidden">
            <div class="relative font-normal" @click="()=>{$router.push({name:'Watch',params:{vidId:lesson.vId}})}">
              <img :src="lesson.lessonThumbnail">
            </div>
            <div class="px-2 pb-3 mt-3 flex items-center justify-between">
              <div class="text-sm">{{ cutString(lesson.lessonTitle, 25) }}</div>
              <div @click="confirmDelete(lesson.markId)">
                <DeleteIcon :size="20"></DeleteIcon>
              </div>
            </div>
            <div class="flex items-center justify-center text-xs" :class="lesson.percentages?``:`invisible`">
            {{ lesson.percentages }}%
            </div>
            <div class="w-full h-1 bg-red-400 relative" :style="{background:`${percentage(lesson.percentages)}`}"></div>
          </div>
        </div>
      </div>
      <!-- Book favorite -->
      <div v-if="active == 2" class="my-5 grid grid-cols-2 gap-5">
        <div v-for="(l, index) in favorites" :key="index" class="bg-white rounded-xl shadow p-5">
          <div class="flex">
            <div class="mr-5 w-40">
              <div class="w-40">
                <img :src="l.bookCover" class="w-40 rounded-xl cursor-pointer"
                     @click="readPdf(l)">
              </div>
            </div>
            <div class="text-lg w-full">
              <div class="my-2 cursor-pointer" @click="readPdf(l)">
                {{ l.bookTitle }}
              </div>
              <div class="text-sm cursor-pointer" @click="readPdf(l)">
                {{ cutString(l.bookDesc, 150) }}
              </div>
              <div class="h-2 w-full bg-forest mt-5 relative">
                <div class="absolute h-full bg-primary" :style="{width:`${l.percentages}%`}"></div>
                <div class="flex justify-end">
                  <div class="mt-4 text-sm">
                    {{ l.percentages }}%
                  </div>
                </div>
              </div>
              <div class="mt-8 flex items-center justify-end">
                <div class="cursor-pointer" @click="confirmDelete(l.markId)">
                  <DeleteIcon :size="20"></DeleteIcon>
                </div>
                <div class="mx-3"></div>
                <div class="cursor-pointer" @click="readPdf(l.bookId,l.bookTitle,l)">
                  <ReadIcon fill="#9ca3af"></ReadIcon>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-40"></div>
    </div>
    <!-- No result -->
    <div class="flex items-center justify-center h-full" v-else>
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
    <!--Audio -->
    <template v-if="isAudio">
      <AudioBook v-if="isAudio" :audio-book="audioBook"
                 @close="()=>{this.isAudio = false}"></AudioBook>
    </template>
    <!-- Description -->
    <template v-if="isDescription">
      <Description
        :isDownload="false"
        :books="readBook" @close="()=>{this.isDescription = false}" @read="read"
        @lisent="lisent"></Description>
    </template>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DeleteIcon from '@/components/DeleteIcon'
import LoadingIndicator from '@/components/LoadingIndicator'
import Confirm from '@/components/Message/Confirm'
import NoResultIcon from '@/components/Empty'
import helper from '@/helper'
import Pdf from '@/components/Pdf/Pdf'
import ReadIcon from '@/components/ReadIcon'
import AudioBook from '@/views/Library/components/AudioBook'
import Description from '@/views/Library/components/Description'

export default {
  components: {
    DeleteIcon,
    LoadingIndicator,
    Confirm,
    NoResultIcon,
    Pdf,
    ReadIcon,
    AudioBook,
    Description
  },
  data () {
    return {
      isDescription: false,
      readBook:{},
      active: 1,
      audioBook: {},
      isAudio: false,
      loading: false,
      isConfirm: false,
      deleteId: null,
      isPdf: false,
      pdfUrl: '',
      bookTitle: ''
    }
  },
  computed: {
    ...mapState('favorite', ['favorites'])
  },
  methods: {
    ...mapActions('favorite', ['getVideoFavorite', 'getBookFavorite', 'removeFavorite']),
    read () {
      this.$store.commit('library/readBookId', this.readBook.bookId)
      this.bookTitle = this.readBook.bookTitle
      this.pdfUrl = this.readBook.bookPDF
      this.isPdf = true
      this.isDescription = false
    },
    lisent () {
      this.audioBook = this.readBook
      this.isAudio = true
      this.isDescription = false
    },
    readPdf (book) {
      this.readBook = book
      this.isDescription = true
    },
    switchMenu (active) {
      this.loading = true
      this.active = active
      if (active == 1) {
        this.getVideoFavorite().then(() => {
          this.loading = false
        })
      } else {
        this.getBookFavorite().then(() => {
          this.loading = false
        })
      }
    },
    deleteFavorite () {
      this.removeFavorite(this.deleteId).then(() => {
        this.isConfirm = false
        this.$store.commit('favorite/removeFavorite', this.deleteId)
      })
    },
    percentage (percentage) {
      if (percentage == null) {
        percentage = 0
      }
      return `linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(229, 231, 235) 0%)`
    },
    confirmDelete (deleteId) {
      this.deleteId = deleteId
      this.isConfirm = true
    },
    getMyVideoFavorite () {

      this.loading = true
      this.getVideoFavorite().then(() => {
        this.loading = false
      })
    },
    cutString (text, limit) {
      if (text) {
        return helper.cutString(text, limit)
      }
      return ''
    }
  },

  created () {
    this.getMyVideoFavorite()
  }
}
</script>
