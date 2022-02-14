<template>
  <div class="fixed w-full h-full left-0 top-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div class="bg-white bg-white rounded-xl shadow relative w-96">
      <div class="h-12 flex items-center px-5 border-b">
        <div class="text-lg font-bold">
          លទ្ធផល
        </div>
        <div
          @click="()=>{this.$emit('close')}"
          class="w-7 h-7 bg-forest rounded-full cursor-pointer flex items-center justify-center absolute -right-2 -top-4">
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div class="p-5">
        <div class="mb-3">
          លទ្ធផលនៃការធ្វើតេស្តរបស់អ្នក
        </div>
        <div class="flex items-center my-3">
          <div class="w-5 h-5 bg-primary flex items-center justify-center text-white rounded-full">
            <div class="text-xl font-black">
              ✓
            </div>
          </div>
          <div class="mx-3">
            ត្រូវ
          </div>
          <div>
            {{ result.correct_answers }}
          </div>
        </div>
        <div class="flex items-center my-3">
          <div class="w-5 h-5 bg-red-500 flex items-center justify-center text-white rounded-full">
            <div class="text-xl font-black">
              <CloseIcon :width="14" fill="#fff"></CloseIcon>
            </div>
          </div>
          <div class="mx-3">
            ខុស
          </div>
          <div>
            {{ result.incorrect_answers }}
          </div>
        </div>
        <div class="flex items-center my-3">
          <div>
            <ClockIcon></ClockIcon>
          </div>
          <div class="mx-3">
            រយៈពេល
          </div>
          <div>
            {{ millisToMinutesAndSeconds(result.duration) }}
          </div>
          <div> នាទី</div>
        </div>
        <div class="mt-5 flex items-center justify-center">
          <button class="text-white rounded-full px-10 py-2 bg-primary" @click="checkResult">
            ផ្ទៀងផ្ទាត់ចំលើយរបស់អ្នក
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CloseIcon from '@/components/CloseIcon'
import { mapState } from 'vuex'
import ClockIcon from '@/components/ClockIcon'

export default {
  components: {
    CloseIcon,
    ClockIcon
  },
  computed: {
    ...mapState('test', ['result'])
  },
  methods: {
    checkResult () {
      this.$emit('checkResult')
    },
    millisToMinutesAndSeconds (millis) {
      let minutes = Math.floor(millis / 60000)
      if (minutes < 10) {
        minutes = `0` + minutes
      }
      let seconds = ((millis % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
}
</script>
