<template>
  <div class="fixed w-full h-full bg-black z-50 left-0 top-0 flex items-center justify-center">
    <div class="bg-white rounded-xl shadow relative w-96 pb-10">
      <div class="py-5 flex items-center px-5 font-bold text-xl border-b" :title="books.bookTitle">
        {{ cutString(books.bookTitle,40)}}
      </div>
      <div
        @click="()=>{this.isReadMore = false; this.$emit('close')}"
        class="absolute -right-2 -top-4 bg-forest w-8 h-8 rounded-full cursor-pointer flex items-center justify-center">
        <CloseIcon></CloseIcon>
      </div>
      <div class="">
        <div class="border-b">
          <div class="w-44 m-auto border-b">
            <img :src="books.bookCover">
          </div>
        </div>

        <div class="flex my-3 justify-center border-b pb-3">
          <template v-if="isDownload">
            <button class="bg-primary text-white flex items-center justify-center rounded-full px-4 h-8 mr-5"
                    @click="()=>{this.$emit('read')}"
                    v-if="books.isDownload">
              <ReadIcon fill="#fff" :size="18"></ReadIcon>
              <div class="ml-1 text-sm">
                អានអត្ថបទ
              </div>
            </button>
          </template>
          <template v-else>
            <button class="bg-primary text-white flex items-center justify-center rounded-full px-4 h-8 mr-5"
                    @click="()=>{this.$emit('read')}"
                    v-if="books.isPdf">
              <ReadIcon fill="#fff" :size="18"></ReadIcon>
              <div class="ml-1 text-sm">
                អានអត្ថបទ
              </div>
            </button>
          </template>
          <button class="bg-primary text-white flex items-center justify-center rounded-full px-4 h-8"
                  @click="()=>{this.$emit('lisent')}"
                  v-if="books.isAudio">
            <HeadPhoneIcon fill="#fff" :size="18"></HeadPhoneIcon>
            <div class="ml-1 text-sm">
              ស្តាប់
            </div>
          </button>
        </div>
        <div class="px-5 mb-3 border-b pb-3">
          <div class="flex text-base mb-2">
            <div>សៀវភៅ:</div>
            <div class="ml-3">{{ books.bookTitle }}</div>
          </div>
          <div class="flex text-sm text-gray-500">
            <div>និពន្ធដោយ:</div>
            <div class="ml-3">{{ books.bookAuthor }}</div>
          </div>
        </div>
        <div class="px-5">
          <div class="font-bold">ពិពណ៏នា</div>
          <div class="text-sm text-gray-500 mt-2 overflow-y-scroll custom-scroll" style="max-height:80px;">
            <span v-if="!isReadMore">
              {{ cutString(books.bookDesc, 150) }}
            </span>
            <span v-else>
              {{ books.bookDesc }}
            </span>
          </div>
          <div class="text-primary text-sm mt-3 cursor-pointer font-bold">
               <span v-if="isReadMore" @click="()=>{this.isReadMore = false}">អានតិច</span>
               <span v-else @click="()=>{this.isReadMore = true}">អានបន្ថែម</span>
          </div>
          <div class="border-b my-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import HeadPhoneIcon from '@/components/HeadPhoneIcon'
import ReadIcon from '@/views/Library/components/ReadIcon'
import helper from '../../../helper'
import TelegramIcon from '../../../components/TelegramIcon'

export default {
  components: {
    TelegramIcon,
    CloseIcon,
    ReadIcon,
    HeadPhoneIcon
  },
  props: {
    isDownload: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    books: {
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      isReadMore: false
    }
  },
  methods: {
    cutString (text, limit) {
      return helper.cutString(text, limit)
    }
  },
  created(){
    this.isReadMore = false
  }
}
</script>

<style scoped>

</style>
