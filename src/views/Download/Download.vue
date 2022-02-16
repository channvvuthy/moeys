<template>
  <div class="p-5 bg-forest h-full">
    <div class="flex text-white">
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
      <div class="flex items-center justify-center flex-col h-full">
        <NoResultIcon></NoResultIcon>
      </div>
    </template>


    <div v-if="active == 2" class="mt-5 overflow-y-scroll h-screen">
      <div class="grid grid-cols-4 gap-5">
        <template v-if="books.length">
          <div v-for="(book, index) in books" :key="index"
               class="rounded-md bg-white shadow cursor-pointer overflow-hidden">
            <div class="relative font-normal" @click="readPdf(book.bookId,book.bookTitle)">
              <img :src="book.bookCover">
            </div>
            <div class="px-2 pb-3 mt-3 flex items-center justify-between">
              <div class="text-sm">{{ book.bookTitle }}</div>
              <div @click="confirmDelete(book.bookId)">
                <DeleteIcon :size="20"></DeleteIcon>
              </div>
            </div>
          </div>
        </template>
      </div>
      <template v-if="books.length === 0 && active == 2">
        <div class="flex items-center justify-center flex-col h-full">
          <NoResultIcon></NoResultIcon>
        </div>
      </template>

      <div class="h-40"></div>
    </div>
    <!-- Confirm message -->
    <template v-if="isConfirm">
      <Confirm @closeMessage="()=>{this.isConfirm = false}" @delete="deleteItem"></Confirm>
    </template>
    <template v-if="isPdf">
      <Pdf :pdf-url="pdfUrl" @closePdf="()=>{this.isPdf = false}" :title="title"></Pdf>
    </template>
  </div>
</template>

<script>
import DeleteIcon from '@/components/DeleteIcon'
import Confirm from '@/components/Message/Confirm'
import NoResultIcon from '@/components/Empty'
import { ipcRenderer } from 'electron'
import Pdf from '@/components/Pdf/Pdf'

export default {
  name: 'Download',
  components: {
    DeleteIcon,
    Confirm,
    NoResultIcon,
    Pdf
  },
  data () {
    return {
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
    readPdf (bookId, title) {
      this.pdfUrl = 'file://' + this.locationPdf + '/' + bookId + '.pdf'
      this.title = title
      this.isPdf = true
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
