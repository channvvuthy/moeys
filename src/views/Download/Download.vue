<template>
  <div class="p-5 bg-forest h-screen relative overflow-y-scroll custom-scroll">
    <div class="flex text-white relative z-50">
      <div class="px-5 py-2 cursor-pointer hover:bg-tertiary rounded-l"
           :class="active == 1?`bg-tertiary`:`bg-primary`" @click="switchMenu(1)">វីដេអូ
      </div>
      <div class="px-5 py-2 cursor-pointer hover:bg-tertiary rounded-r"
           :class="active == 2?`bg-tertiary`:`bg-primary`" @click="switchMenu(2)">សៀវភៅ
      </div>
    </div>
    <div class="grid grid-cols-4 gap-5 mt-5 " v-if="active == 1">
      <template v-if="videos.length">
        <div v-for="(lesson, index) in videos" :key="index"
             class="rounded-md bg-white shadow cursor-pointer overflow-hidden">
          <div class="relative font-normal"
               @click="()=>{$router.push({name:'DownloadDetail',params:{chap_id:lesson.chap_id}})}">
            <img :src="lesson.lessonThumbnail">
          </div>
          <div class="px-2 pb-3 mt-3 flex items-center justify-between">
            <div class="text-sm">{{ lesson.lessonTitle }}</div>
            <div @click="confirmDelete(lesson.chap_id)">
              <DeleteIcon :size="20"></DeleteIcon>
            </div>
          </div>
        </div>
      </template>
    </div>
    <template v-if="videos.length === 0 && active == 1">
      <div class="flex items-center justify-center flex-col h-full absolute top-0 left-0 w-full z-10">
        <NoResultIcon></NoResultIcon>
      </div>
    </template>
    <template v-if="books.length === 0 && active == 2">
      <div class="flex items-center justify-center flex-col h-full absolute top-0 left-0 w-full z-10">
        <NoResultIcon></NoResultIcon>
      </div>
    </template>
    <div class="grid grid-cols-2 gap-5 mt-5" v-if="active == 2">
      <template v-if="books.length">
        <div v-for="(l, index) in books" :key="index" class="bg-white rounded-xl shadow p-5">
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
                <div class="cursor-pointer" @click="confirmDelete(l.bookId)">
                  <DeleteIcon :size="21"></DeleteIcon>
                </div>
                <div class="mx-3"></div>
                <div class="cursor-pointer" @click="readPdf(l)">
                  <ReadIcon fill="#9ca3af"></ReadIcon>
                </div>

              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- Confirm message -->
    <template v-if="isConfirm">
      <Confirm @closeMessage="()=>{this.isConfirm = false}" @delete="deleteItem"></Confirm>
    </template>
    <template v-if="isPdf">
      <Pdf :pdf-url="pdfUrl" @closePdf="()=>{this.isPdf = false}" :title="title" :is-download="true"></Pdf>
    </template>
    <template v-if="isAudio">
      <AudioBook v-if="isAudio" :audio-book="readBook" :showDownload="false"
                 @close="()=>{this.isAudio = false}"></AudioBook>
    </template>
    <!-- Description -->
    <template v-if="isDescription">
      <Description :books="readBook" @close="()=>{this.isDescription = false}" @read="read"
                   @lisent="lisent"></Description>
    </template>
    <div class="h-40"></div>
  </div>
</template>

<script>
import DeleteIcon from '@/components/DeleteIcon'
import Confirm from '@/components/Message/Confirm'
import NoResultIcon from '@/components/Empty'
import { ipcRenderer } from 'electron'
import Pdf from '@/components/Pdf/Pdf'
import ReadIcon from '@/components/ReadIcon'
import helper from '@/helper'
import Description from '@/views/Library/components/Description'
import AudioBook from '@/views/Library/components/AudioBook'

export default {
  name: 'Download',
  components: {
    DeleteIcon,
    Confirm,
    NoResultIcon,
    Pdf,
    ReadIcon,
    Description,
    AudioBook
  },
  data () {
    return {
      isAudio: false,
      isDescription: false,
      readBook: {},
      isPdf: false,
      videos: [],
      books: [],
      isConfirm: false,
      chap_id: null,
      active: 1,
      locationPdf: '',
      pdfUrl: '',
      title: '',

    }
  },
  methods: {
    cutString (text, limit) {
      return helper.cutString(text, limit)
    },
    read () {
      this.pdfUrl = 'file://' + this.locationPdf + '/' + this.readBook.bookId + '.pdf'
      this.title = this.readBook.bookTitle
      this.isPdf = true
      this.isDescription = false
    },
    lisent () {
      this.isAudio = true
      this.isDescription = false
    },
    readPdf (library) {
      let bookAudios
      if (library.bookAudios && library.bookAudios.length ) {
        bookAudios = library.bookAudios.filter((value, index, self) => self.findIndex((m) => m.id === value.id) === index)
        for (let i = 0; i < bookAudios.length; i++) {
          bookAudios[i].audio = 'file://' + this.locationPdf + '/' + bookAudios[i].id + '.mp3'
        }
      }
      library.bookAudios = bookAudios
      this.readBook = library
      this.isDescription = true

      // this.pdfUrl = 'file://' + this.locationPdf + '/' + library.bookId + '.pdf'
      // this.title = title
      // this.isPdf = true
    },
    switchMenu (active) {
      this.active = active
    },
    confirmDelete (chap_id) {
      this.chap_id = chap_id
      this.isConfirm = true
    },
    deleteItem () {
      if (this.active == 1) {
        let videos = JSON.parse(localStorage.getItem('videos'))
        videos = videos.filter(item => item.chap_id != this.chap_id)
        this.videos = videos.filter((value, index, self) => self.findIndex((m) => m.chap_id === value.chap_id) === index)
        localStorage.setItem('videos', JSON.stringify(videos))
      }

      if (this.active == 2) {
        let books = JSON.parse(localStorage.getItem('books'))
        books = books.filter(item => item.bookId != this.chap_id)
        this.books = books.filter((value, index, self) => self.findIndex((m) => m.bookId === value.bookId) === index)
        localStorage.setItem('books', JSON.stringify(books))
      }
      this.isConfirm = false
    }
  },
  created () {

    ipcRenderer.send('getPath', [])
    ipcRenderer.on('getPath', (event, arg) => {
      this.locationPdf = arg
      ipcRenderer.removeAllListeners('getPath')
    })

    let videos = localStorage.getItem('videos')
    if (videos !== '' || videos !== false) {
      if (videos !== null) {
        videos = JSON.parse(videos)
        videos = videos.filter((value, index, self) => self.findIndex((m) => m.chap_id === value.chap_id) === index)
        this.videos = videos
      }
    }

    let books = localStorage.getItem('books')
    if (books !== '' || books !== false) {
      if (books !== null) {
        books = JSON.parse(books)
        books = books.filter((value, index, self) => self.findIndex((m) => m.bookId === value.bookId) === index)
        this.books = books
      }
    }
  }
}
</script>

<style scoped>

</style>
