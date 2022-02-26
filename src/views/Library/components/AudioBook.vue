<template>
  <div class="fixed bottom-0 right-0 h-full w-full flex items-center justify-center px-10 bg-black bg-opacity-80 z-50 ">
    <div class="login text-white rounded-xl shadow relative w-100">

      <div class="absolute h-full w-full top-13 left-0 z-50 rounded-xl overflow-y-scroll bg-white" v-if="isList">
        <div class="bg-primary text-center py-4 text-xl relative capitalize">
          <div>
            {{ library.bookTitle }}
          </div>
          <div class="absolute right-5 top-5 cursor-pointer" @click="()=>{this.isList = false}">
            <CloseIcon fill="#fff"></CloseIcon>
          </div>
        </div>

        <div v-for="(book,index) in library.bookAudios">
          <div
            @click="select(index)"
            class="text-black border-b py-3 px-5 cursor-pointer mb-2 rounded-md flex items-center">
            <div>
              <div class="bg-primary h-9 w-9 flex items-center rounded-full justify-center">
                <HeadPhoneIcon fill="#fff" :size="20"></HeadPhoneIcon>
              </div>
            </div>
            <div class="ml-3 w-full">
              {{ book.title }}
            </div>
            <div class="text-right fle">
              <div class="border w-5 h-5 rounded-full flex items-center justify-center border-gray-500">
                <div class="w-4 h-4 bg-primary rounded-full" v-if="active == index"></div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="flex h-12 flex items-center px-5 border-b border-primary">
        <div class="text-lg font-bold">សៀវភៅជាសំលេង</div>
      </div>
      <div
        @click="()=>{this.$emit('close')}"
        class="bg-forest w-8 h-8 rounded-full flex items-center justify-center cursor-pointer absolute -right-2 -top-4">
        <CloseIcon></CloseIcon>
      </div>
      <div class="mt-5">
        <img
          :src="library.bookAudios[active].bookCover"
          class="w-60 m-auto rounded-xl shadow">
        <div class="text-center py-3">
          {{ library.bookAudios[active].title }}
        </div>
      </div>
      <div>
        <div class="w-full px-10">
          <input type="range" class="w-full rangeSlider" id="seekSlider" min="0" max="100" step="1" v-model="seek">
          <audio controls autoplay class="hidden" id="myAudio" @timeupdate="timeUpdate()">
            <source :src="library.bookAudios[active].audio" type="audio/ogg">
            Your browser does not support the audio element.
          </audio>
          <div class="justify-between flex items-center mt-1">
            <span id="currentTime" class="text-sm">00:</span>
            <span id="currentDuration" class="text-sm">00</span>
          </div>
          <div class="flex justify-end items-center mt-5">
            <template v-if="showDownload">
              <div class="mr-4" v-if="isInDownload(library.bookAudios[active].id)">
                <Loading color="#FFF"></Loading>
              </div>
              <div class="mr-4 cursor-pointer"
                   v-else
                   @click="downloadAudio(library.bookAudios[active])">
                <DownloadIcon fill="#fff"></DownloadIcon>
              </div>
              <div v-if="library.isFavorite" class="cursor-pointer mr-5" @click="removeMyFavorite(library)">
                <FavoritedIcon :size="24"></FavoritedIcon>
              </div>
              <div class="cursor-pointer mr-5" v-else @click="addFavorite(library.bookId)">
                <FavoriteIcon fill="#fff" :size="24"></FavoriteIcon>
              </div>
            </template>
            <div class="cursor-pointer" @click="()=>{this.isList = true}">
              <ListIcon></ListIcon>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full mt-5 font-bold items-center justify-between px-10 mb-10">
        <div class="transform rotate-180 cursor-pointer" @click="prev">
          <NextIcon fill="#fff"></NextIcon>
        </div>
        <div class="cursor-pointer relative" @click="decreaseTime">
          <span class="absolute text-xs font-thin" style="top:5px;left:7px;">15</span>
          <UndoIcon fill="#fff"></UndoIcon>
        </div>
        <div class="cursor-pointer border-4 border-white w-12 h-12 rounded-full flex items-center justify-center mx-5">
          <div class="w-12 h-12 flex items-center justify-center" @click="playPause">
            <PauseIcon :size="18" fill="#fff" v-if="!showPlay"></PauseIcon>
            <div v-else class="ml-1">
              <PlayIcon :size="18" fill="#fff"></PlayIcon>
            </div>
          </div>
        </div>
        <div class="cursor-pointer relative" @click="increaseTime">
          <span class="absolute text-xs font-thin" style="top:5px;left:5px;">15</span>
          <RedoIcon fill="#fff"></RedoIcon>
        </div>
        <div class="cursor-pointer" @click="next">
          <NextIcon fill="#fff"></NextIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayIcon from '@/components/PlayIcon'
import PauseIcon from '@/components/PauseIcon'
import NextIcon from '@/views/Library/components/NextIcon'
import SoundIcon from '@/components/SoundIcon'
import CloseIcon from '@/components/CloseIcon'
import RedoIcon from '@/components/RedoIcon'
import UndoIcon from '@/components/UndoIcon'
import MuteIcon from '@/components/MuteIcon'
import FavoriteIcon from '@/components/FavoriteIcon'
import FavoritedIcon from '@/components/FavoritedIcon'
import ListIcon from '@/views/Library/components/ListIcon'
import HeadPhoneIcon from '@/components/HeadPhoneIcon'
import DownloadIcon from '@/components/DownloadIcon'
import { mapActions } from 'vuex'
import Loading from '@/views/Library/components/Loading'
import { ipcRenderer } from 'electron'
import helper from '@/helper'

export default {
  components: {
    PauseIcon,
    PlayIcon,
    NextIcon,
    SoundIcon,
    CloseIcon,
    RedoIcon,
    UndoIcon,
    MuteIcon,
    FavoriteIcon,
    ListIcon,
    DownloadIcon,
    HeadPhoneIcon,
    FavoritedIcon,
    Loading
  },
  props: {
    showDownload: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    audioBook: {
      default: () => {
        return {}
      }
    },
    width: {
      default: () => {
        return 0
      }
    }
  },
  data () {
    return {
      library: {},
      isList: false,
      audioVolume: 100,
      active: 0,
      myAudio: null,
      muted: false,
      showPlay: false,
      currentTime: null,
      currentDuration: null,
      seekSlider: null,
      seek: 0,
      inDownload: [],
    }
  },
  methods: {
    ...mapActions('favorite', ['favorite', 'removeFavorite']),
    downloadAudio (audio) {
      let download = localStorage.getItem('books')
      if (download == null || download == '' || download == false) {
        localStorage.setItem('books', JSON.stringify([this.library]))
      }
      download = JSON.parse(localStorage.getItem('books'))
      download = download.filter((value, index, self) => self.findIndex((m) => m.bookId === value.bookId) === index)

      for (let i = 0; i < download.length; i++) {
        if (download[i].bookId == this.library.bookId) {
          download[i].bookAudios.push(audio)
        }
      }
      this.library.ex = 'mp3'
      this.library.audioId = audio.id
      this.library.audioUrl = audio.audio
      ipcRenderer.send('downloadPdf', this.library)
      localStorage.setItem('books', JSON.stringify(download))
      this.inDownload.push(audio.id)

    },
    isInDownload (audioId) {
      for (let i = 0; i < this.inDownload.length; i++) {
        if (audioId == this.inDownload[i]) {
          return true
        }
      }
      return false
    },
    removeMyFavorite (library) {
      this.removeFavorite(library.markId).then(() => {
        this.$store.commit('library/removeFavorite', library)
      })
      this.library.isFavorite = false
    },
    addFavorite (b_id) {
      let payload = {
        b_type: 1,
        b_id
      }
      this.favorite(payload).then(res => {
        payload.markId = res.data.markId
        this.$store.commit('library/addFavorite', payload)
        this.library.markId = payload.markId
        this.library.isFavorite = true
      })
    },
    select (index) {
      this.active = index
      this.myAudio.src = this.library.bookAudios[this.active].audio
      this.isList = false
    },
    prev () {
      if (this.active > 0) {
        this.active--
        this.myAudio.src = this.library.bookAudios[this.active].audio
      }
    },
    next () {
      if (this.active < this.library.bookAudios.length) {
        this.active++
        this.myAudio.src = this.library.bookAudios[this.active].audio
      }
    },
    setVolume (event) {
      this.myAudio.volume = this.volumeSlider.value / 100
      this.volumeSlider.style.background = `linear-gradient(90deg, rgb(255,255,255) ${event.target.value}%, rgb(214,214,214) ${event.target.value}%)`

    },
    vidMute () {
      if (this.myAudio.muted) {
        this.myAudio.muted = false
        this.muted = false
      } else {
        this.muted = true
        this.myAudio.muted = true
        this.myAudio.volume = 100
      }
    },
    increaseTime () {
      this.myAudio.currentTime += 15
      if (parseInt(this.myAudio.currentTime) === parseInt(this.myAudio.duration)) {
        this.muted = true
        this.showPlay = true
      }
    },
    decreaseTime () {
      if (this.myAudio.currentTime > 15) {
        this.myAudio.currentTime -= 15
      }
    },
    playPause () {
      if (this.myAudio.paused) {
        this.myAudio.play()
        this.showPlay = false
      } else {
        this.myAudio.pause()
        this.showPlay = true
      }
    },
    timeUpdate () {
      let nt = Math.floor(this.myAudio.currentTime * (100 / this.myAudio.duration))
      this.seek = nt
      this.seekSlider.style.background = `linear-gradient(90deg, rgb(255,255,255) ${nt}%, rgb(214,214,214) ${nt}%)`
      let curmins = Math.floor(this.myAudio.currentTime / 60)
      let cursecs = Math.floor(this.myAudio.currentTime - curmins * 60)
      let durmins = Math.floor(this.myAudio.duration / 60)
      let dursecs = Math.floor(this.myAudio.duration - durmins * 60)
      if (cursecs < 10) {
        cursecs = '0' + cursecs
      }
      if (dursecs < 10) {
        dursecs = '0' + dursecs
      }
      if (curmins < 10) {
        curmins = '0' + curmins
      }
      if (durmins < 10) {
        durmins = '0' + durmins
      }
      if (curmins && cursecs) {
        this.currentTime.innerHTML = curmins + ':' + cursecs + '&nbsp;'
      }
      if (durmins && dursecs) {
        this.currentDuration.innerHTML = durmins + ':' + dursecs
      }

    },
    getMyAudio () {
      this.myAudio = document.getElementById('myAudio')
      this.currentTime = document.getElementById('currentTime')
      this.currentDuration = document.getElementById('currentDuration')
      this.seekSlider = document.getElementById('seekSlider')
      this.volumeSlider = document.getElementById('volumeSlider')

      this.seekSlider.addEventListener('input', (event) => {
        let seekTo = this.myAudio.duration * (event.target.value / 100)
        this.seekSlider.style.background = `linear-gradient(90deg, rgb(255,255,255) ${event.target.value}%, rgb(214,214,214) ${event.target.value}%)`
        this.myAudio.currentTime = seekTo
      }, true)

    }
  },
  mounted () {
    this.getMyAudio()
  },
  created () {
    this.library = this.audioBook
    ipcRenderer.on('downloaded', (event, arg) => {
      helper.success('សៀវភៅជាសំលេងត្រូវបានទាញយកជោគជ័យ')
      this.inDownload = this.inDownload.filter(item => item != arg.audioId)
      ipcRenderer.removeAllListeners('downloaded')

    })
  }
}
</script>

<style>
.rangeSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: #ffffff;
  border-radius: 50px;
}

.rangeSlider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgb(255, 255, 255) 0%,
    rgb(151, 151, 151) 0%
  );
  outline: none;
  cursor: pointer;
}
</style>
