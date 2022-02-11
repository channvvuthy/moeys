<template>
  <div
    class="flex items-center justify-center items-center w-full h-full top-0 left-0 z-50 bg-black bg-opacity-80 fixed">
    <div class="w-100 bg-white rounded-xl shadow relative">
      <div class="h-12 border-b flex items-center">
        <div class="text-lg font-black px-5">
          ប្តូរពាក្យសម្ងាត់
        </div>
        <div class="absolute w-7 h-7 bg-forest rounded-full
        shadow flex items-center justify-center -right-2 -top-4 cursor-pointer"
             @click="()=>{this.$emit('closeChangePassword')}"
        >
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div class="p-5">
        <div class="flex items-center relative">
          <div class="border w-60 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
            លេខសម្ងាត់បច្ចុប្បន្ន
          </div>
          <input type="password" v-model="current_password"
                 class="w-full  border h-10 px-3 outline-none rounded-r-full bg-white"
          >
        </div>
        <div class="my-4"></div>
        <div class="flex items-center relative">
          <div class="border w-60 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
            លេខសម្ងាត់ថ្មី
          </div>
          <input type="password" class="w-full  border h-10 px-3 outline-none rounded-r-full bg-white"
                 v-model="password"
          >
        </div>
        <div class="my-4"></div>
        <div class="flex items-center relative">
          <div class="border w-60 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
            ផ្ទៀងផ្ទាត់លេខសម្ងាត់ថ្មី
          </div>
          <input type="password" class="w-full  border h-10 px-3 outline-none rounded-r-full bg-white"
                 v-model="password_confirmation"
          >
        </div>
        <div class="my-4"></div>
        <button class="bg-primary text-white w-full rounded-full h-10 relative" :disabled="loading" @click="change">
          <div class="absolute top-1 w-full flex items-center justify-center" v-if="loading">
            <LoadingIndicator :bg="false"></LoadingIndicator>
          </div>
          <div v-else>កែប្រែ</div>
        </button>
      </div>
    </div>
    <Message v-if="isMessage" @closeMessage="()=>{this.isMessage = false}"
             message="សូមធ្វើការជ្រើសរើសសាលា"></Message>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import { mapActions } from 'vuex'
import Message from '@/components/Message/Message'
import helper from '@/helper'
import LoadingIndicator from '@/components/LoadingIndicator'

export default {
  data () {
    return {
      isMessage: false,
      current_password: '',
      password_confirmation: '',
      password: '',
      loading: false
    }
  },
  components: {
    CloseIcon,
    Message,
    LoadingIndicator
  },
  computed: {},
  methods: {
    ...mapActions('user', ['updatePassword']),
    change () {
      if (!this.current_password) {
        helper.error('សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន')
        return
      }
      if (this.current_password.length < 6) {
        helper.error('ពាក្យសម្ងាត់យ៉ាងតិច 6 ខ្ទង់')
        return
      }
      if (!this.password) {
        helper.error('សូមបញ្ចូលពាក្យសម្ងាត់')
        return
      }
      if (this.password.length < 6) {
        helper.error('ពាក្យសម្ងាត់យ៉ាងតិច 6 ខ្ទង់')
        return
      }
      if (!this.password_confirmation) {
        helper.error('សូមបញ្ចូលពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់')
        return
      }
      if (this.password_confirmation.length < 6) {
        helper.error('ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់យ៉ាងតិច 6 ខ្ទង់')
        return
      }
      if (this.password != this.password_confirmation) {
        helper.error('ពាក្យសម្ងាត់ផ្ទៀផ្ទាត់មិនត្រឹមត្រូ')
        return
      }
      let payload = {
        current_password: this.current_password,
        password_confirmation: this.password_confirmation,
        password: this.password,
      }
      this.loading = true
      this.updatePassword(this.password).then(() => {
        this.$emit('closeChangePassword')
        this.loading = false
      }).catch(err => {
        helper.error(err.response.data.message)
        this.loading = false
      })
    }
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
