<template>
  <div class="flex items-center justify-center fixed w-full h-full z-50 bg-black bg-opacity-80 left-0 top-0">
    <div class="w-1/2 bg-white rounded-xl shadow relative">
      <div class="h-12 flex items-center px-5 border-b">
        <div class="text-lg font-bold">ពត៍មានលំអិត</div>
        <div class="w-7 h-7 rounded-full bg-forest flex items-center justify-center cursor-pointer
absolute -right-2 -top-4"
             @click="()=>{this.$emit('close')}">
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div style="max-height: 42rem;" class="overflow-y-scroll p-5 custom-scroll">
        <div class="text-lg mb-2">
          {{ details.newsTitle }}
        </div>
        <div>
          <img :src="details.photo" class="rounded-xl">
        </div>
        <div class="mt-3 text-gray-500 text-sm mb-3">
          {{ getDateFormat(details.posted) }}
        </div>
        <div v-html="details.longDetails"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import { mapState } from 'vuex'
import dateFormat from '@/helper/dateFormat'

export default {
  components: {
    CloseIcon
  },
  computed: {
    ...mapState('news', ['details'])
  },
  methods: {
    getDateFormat (timestamp) {
      return dateFormat.formatDate(timestamp, 'km')
    },
  }
}
</script>

<style>
  iframe{
    width: 100% !important;
    margin: 10px 0px;
  }
</style>
