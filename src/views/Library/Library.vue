<template>
  <div class="py-5 pl-5 bg-forest h-full" ref="parent">
    <div>
      <div class="flex items-center">
        <div v-for="(type, index) in types" :key="index" @click="filterType(index)">
          <div class="px-5 py-2 cursor-pointer hover:bg-tertiary bg-primary text-white"
               :class="index == 0 ?`rounded-l`:
                index == (types.length - 1) ?`rounded-r`: ``"
               :style="index == defaultIndexOfType?{backgroundColor:`#153f67`}:{}"
          >
            {{ type.bookTypeTitle }}
          </div>
        </div>
      </div>
      <div
        class="h-10 w-96 border shadow border my-5 rounded flex items-center px-5 justify-between cursor-pointer bg-white"
        @click="()=>{this.isFilter = true}">
        <div>
          {{ label }}
        </div>
        <div class="transform rotate-90">
          <ChevronRight :size="10" :fill="`#000`"></ChevronRight>
        </div>
      </div>
      <!-- Filter -->
      <div
        v-if="isFilter"
        class="flex fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 z-50 items-center justify-center">
        <ul class="w-96 bg-white rounded-xl relative" v-if="libraries['filter'].length">
          <div
            @click="() =>{this.isFilter = false}"
            class="absolute -right-4 -top-4 cursor-pointer rounded-full bg-forest shadow w-8 h-8 flex items-center justify-center">
            <CloseIcon :width="24"></CloseIcon>
          </div>
          <li v-for="(f, index) in libraries['filter']" :key="index"
              @click="filterClass(f)"
              class="px-5 py-2 cursor-pointer"
              :class="index < (libraries['filter'].length - 1)?`border-b`:``">
            {{ f.title }}
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-center h-screen w-full" v-if="loadingType">
        <LoadingIndicator></LoadingIndicator>
      </div>
      <div class="h-screen overflow-y-scroll custom-scroll pr-5" @scroll="onScroll" v-else>
        <div class="grid grid-cols-2 gap-5">
          <div v-for="(l, index) in libraries.data" :key="index" class="bg-white rounded-xl shadow p-5">
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
                  <div class="absolute h-full bg-primary"
                       :style="{width:`${l.percentages > 100? 100:l.percentages}%`}"></div>
                  <div class="flex justify-end">
                    <div class="mt-4 text-sm">
                      {{ l.percentages > 100 ? 100 : l.percentages }}%
                    </div>
                  </div>
                </div>
                <div class="mt-8 flex items-center justify-end">
                  <div class="cursor-pointer" @click="addFavorite(l.bookId)"
                       v-if="(!isInFavorite(l.bookId) && !l.isFavorite)">
                    <FavoriteIcon fill="#9ca3af"></FavoriteIcon>
                  </div>
                  <div v-else class="cursor-pointer" @click="removeMyFavorite(l)">
                    <FavoritedIcon></FavoritedIcon>
                  </div>
                  <div class="w-3"></div>
                  <div v-if="l.isShare">
                    <div v-if="isInDownload(l.bookId)">
                      <Loading></Loading>
                    </div>
                    <div v-else>
                      <div @click="downloadPdf(l)" class="cursor-pointer" v-if="!isAlreadyDownload(l.bookId)">
                        <DownloadIcon fill="#9ca3af"></DownloadIcon>
                      </div>
                      <div v-else>
                        <div class="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center">
                          <CheckIcon fill="#fff" :size="20"></CheckIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="w-3"></div>
                  <div class="cursor-pointer" @click="readPdf(l)">
                    <ReadIcon fill="#9ca3af"></ReadIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-56"></div>
        </div>
      </div>
    </div>
    <!-- Pdf -->
    <template v-if="isPdf">
      <Pdf :pdfUrl="pdfUrl" @closePdf="()=>{this.isPdf = false;}" :title="pdfTitle"></Pdf>
    </template>
    <!--Audio -->
    <template v-if="isAudio">
      <AudioBook :width="audioWidth" v-if="isAudio" :audio-book="audioBook"
                 @close="()=>{this.isAudio = false}"></AudioBook>
    </template>
    <!-- Description -->
    <template v-if="isDescription">
      <Description :books="readBook" @close="()=>{this.isDescription = false}" @read="read"
                   @lisent="lisent"></Description>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import ChevronRight from '@/components/ChevronRigth'
import CloseIcon from '@/components/CloseIcon'
import helper from '@/helper'
import FavoriteIcon from '@/components/FavoriteIcon'
import DownloadIcon from '@/components/DownloadIcon'
import ReadIcon from '@/components/ReadIcon'
import FavoritedIcon from '@/components/FavoritedIcon'
import Pdf from '@/components/Pdf/Pdf'
import { ipcRenderer } from 'electron'
import Loading from './components/Loading'
import CheckIcon from '@/components/CheckIcon'
import AudioBook from '@/views/Library/components/AudioBook'
import Description from '@/views/Library/components/Description'

export default {
  components: {
    LoadingIndicator,
    ChevronRight,
    CloseIcon,
    FavoriteIcon,
    DownloadIcon,
    ReadIcon,
    FavoritedIcon,
    Pdf,
    Loading,
    CheckIcon,
    AudioBook,
    Description
  },
  data () {
    return {
      readBook: {},
      isDescription: false,
      audioBook: {},
      isAudio: false,
      audioWidth: 0,
      books: [],
      inDownload: [],
      pdfTitle: '',
      isPdf: false,
      pdfUrl: '',
      loadingType: false,
      types: [],
      active: 0,
      defaultIndexOfType: 0,
      label: 'មើលទាំងអស់',
      catId: null,
      isFilter: false,
      page: 1,
      inFavorite: [],
      payload: {
        page: 1,
        catId: null,
        filter: ''
      }
    }
  },
  computed: {
    ...mapState('library', ['loading', 'libraries']),
  },
  methods: {
    ...mapActions('library', ['getLibrary', 'getBookById', 'getBookType']),
    ...mapActions('favorite', ['favorite', 'removeFavorite']),
    removeMyFavorite (library) {
      this.removeFavorite(library.markId).then(() => {
        this.$store.commit('library/removeFavorite', library)
        this.inFavorite = this.inFavorite.filter(item => item != library.bookId)
      })
    },
    read () {
      this.$store.commit('library/readBookId', this.readBook.bookId)
      this.pdfTitle = this.readBook.bookTitle
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
    cutString (text, limit) {
      if (text) {
        return helper.cutString(text, limit)
      }
      return ''

    },
    percentage (percentage) {
      return `linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(214,214,214) ${percentage}%)`
    },
    filterClass (f) {
      this.label = f.title
      this.isFilter = false
      this.payload.filter = f.id
      this.getType()
    },
    filterType (index) {
      this.page = 1
      this.defaultIndexOfType = index
      this.payload.filter = ''
      this.label = 'មើលទាំងអស់'
      this.getType()

    },
    isAlreadyDownload (bookId) {
      if (this.books.length) {
        for (let i = 0; i < this.books.length; i++) {
          if (this.books[i].bookId == bookId) {
            return true
          }
        }
        return false
      }
      return false
    },
    downloadPdf (book) {
      book.isDownload = true
      book.bookAudios = []
      let download = localStorage.getItem('books')
      if (download == null || download == '' || download == false) {
        localStorage.setItem('books', JSON.stringify([book]))
        return
      }
      download = JSON.parse(localStorage.getItem('books'))
      download.push(book)
      localStorage.setItem('books', JSON.stringify(download))
      this.inDownload.push(book.bookId)
      ipcRenderer.send('downloadPdf', book)
    },
    isInDownload (bookId) {
      for (let i = 0; i < this.inDownload.length; i++) {
        if (bookId == this.inDownload[i]) {
          return true
        }
      }
      return false
    },
    addFavorite (b_id) {
      let payload = {
        b_type: 1,
        b_id
      }
      this.favorite(payload).then(res => {
        this.inFavorite.push(b_id)
        payload.markId = res.data.markId
        this.$store.commit('library/addFavorite', payload)
      })
    },
    isInFavorite (favorite) {
      for (let index = 0; index < this.inFavorite.length; index++) {
        if (this.inFavorite[index] == favorite) {
          return true
        }
      }
      return false
    },
    onScroll ({
      target: {
        scrollTop,
        clientHeight,
        scrollHeight
      }
    }) {
      // eslint-disable-next-line eqeqeq
      if (scrollTop + clientHeight >= scrollHeight) {
        this.page++
        this.catId = this.types[this.defaultIndexOfType]['bookTypeId']
        this.payload.catId = this.catId
        this.payload.page = this.page
        this.getLibrary(this.payload)
      }
    },
    getType () {
      this.loadingType = true
      this.getBookType().then(res => {
        this.types = res.data
        this.loadingType = false
        if (this.types.length) {
          this.catId = this.types[this.defaultIndexOfType]['bookTypeId']
          this.payload.catId = this.catId
          this.payload.page = this.page
          this.getLibrary(this.payload).then(res => {
          })
        }
      })
    },
    getBook () {
      let books = localStorage.getItem('books')
      if (books !== '' || books !== false) {
        if (books !== null) {
          books = JSON.parse(books)
          books = books.filter((value, index, self) => self.findIndex((m) => m.bookId === value.bookId) === index)
          this.books = books
        }
      }
    }
  },
  updated () {
    this.audioWidth = this.$refs.parent.clientWidth
  },
  created () {
    this.getType()
    this.getBook()

    ipcRenderer.on('downloaded', (event, arg) => {
      this.inDownload = this.inDownload.filter(item => item != arg.bookId)
      // ipcRenderer.removeAllListeners('downloaded')
      // helper.success('សៀវភៅត្រូវបានទាញយកជោគជ័យ')
      this.getBook()
    })

  },
  watch: {
    'sidebarWidth': function () {
      this.audioWidth = this.$refs.parent.clientWidth
    }
  }
}
</script>

<style scoped>

</style>
