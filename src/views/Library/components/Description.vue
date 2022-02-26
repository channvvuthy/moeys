<template>
  <div class="fixed w-full h-full bg-black z-50 left-0 top-0 flex items-center justify-center">
    <div class="bg-white rounded-xl shadow relative w-96 pb-10">
      <div class="h-12 flex items-center px-5 font-bold text-xl border-b">
        {{ books.bookTitle }}
      </div>
      <div
        @click="()=>{this.$emit('close')}"
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
          <button class="bg-primary text-white flex items-center justify-center rounded-full px-4 h-8 mr-5"
                  @click="()=>{this.$emit('read')}"
                  v-if="books.isPdf">
            <ReadIcon fill="#fff" :size="18"></ReadIcon>
            <div class="ml-1 text-sm">
              អាន
            </div>
          </button>
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
          <div class="text-sm text-gray-500 mt-2">
            {{ books.bookDesc }}
          </div>
          <div class="text-primary text-sm mt-3 cursor-pointer font-bold" @click="()=>{this.$emit('read')}">អានបន្ថែម</div>
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

export default {
  components: {
    CloseIcon,
    ReadIcon,
    HeadPhoneIcon
  },
  props: {
    books: {
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
