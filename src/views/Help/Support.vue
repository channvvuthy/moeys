<template>
  <div class="w-full h-full flex items-center justify-start flex-col z-50 py-10 font-mono">
    <div v-if="loading" class="fixed w-full h-full left-0 top-0 flex items-center justify-center z-50">
      <LoadingIndicator></LoadingIndicator>
    </div>
    <div class="text-center">
      <img src="/logo/Moeys.png" class="w-36 m-auto">
      <p class="mt-3 text-lg">បើមានបញ្ហាក្នុងការប្រើប្រាស់កម្មវិធី អាចធ្វើការសាកសួរព័ត៍មានបន្ថែមតាមរយៈ</p>
    </div>
    <div class="grid grid-cols-3 gap-10 px-10 w-full mt-10">
      <div class="bg-primary rounded-lg text-white text-sm py-7 px-10">
        <div class="text-base text-center">
          ទំនាក់ទំនងតាមរយៈ
        </div>
        <div class="grid grid-cols-3 gap-5 mt-5">
          <div v-for="(phone, index) in helps.PhoneList" :key="index" class="text-center cursor-pointer" @click="showPhone(phone)">
            <img :src="phone.icon" class="w-16 m-auto">
            <div class="mt-2 font-medium">{{phone.title}}</div>
          </div>
        </div>
      </div>
      <div class="py-7 px-10 bg-green-400 rounded-lg text-white">
        <div class="text-base text-center">
          ទំនាក់ទំនងតាមប្រព័ន្ធ Facebook
        </div>
        <div class="mt-5">
          <div v-for="(contact, index) in helps.ChatList" :key="index" class="text-center cursor-pointer" @click="openLink(contact)">
            <template v-if="contact.title == 'Facebook'">
              <img :src="contact.icon" class="w-16 m-auto">
              <div class="mt-2 font-medium">{{contact.title}}</div>
            </template>
          </div>
        </div>
      </div>
      <div class="py-7 px-10 bg-purple-400 rounded-lg text-white">
        <div class="text-base text-center">
          ទំនាក់ទំនងតាមប្រព័ន្ធ Telegram
        </div>
        <div class="mt-5">
          <div v-for="(contact, index) in helps.ChatList" :key="index" class="text-center cursor-pointer" @click="openLink(contact)">
            <template v-if="contact.title == 'Telegram'">
              <img :src="contact.icon" class="w-16 m-auto">
              <div class="mt-2 font-medium">{{contact.title}}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- Phone -->
    <div class="fixed w-full h-full z-50 left-0 top-0 flex items-center justify-center bg-black bg-opacity-90" v-if="isPhone">
      <div class="w-56 rounded relative shadow bg-white">
        <div class="flex justify-between items-center px-1 py-2 border-b">
          <div class="text-lg w-full text-center">{{title}}</div>
          <div class="cursor-pointer" @click="() =>{this.isPhone = false}">
            <CloseIcon :width="20"></CloseIcon>
          </div>
        </div>
        <div class="py-4 text-center">
          <div v-for="(phone, index) in phones" :key="index">
            <p class="text-primary">{{phone}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import EyeIcon from "./../../components/EyeIcon.vue"
import BackIcon from "./../../components/BackIcon.vue"
import {mapState, mapActions} from "vuex"
import CloseIcon from "./../../components/CloseIcon.vue"
import LoadingIndicator from "./../../components/LoadingIndicator.vue"
const { ipcRenderer } = require('electron')

export default {
  components:{
    EyeIcon,
    BackIcon,
    CloseIcon,
    LoadingIndicator
  },
  data(){
    return{
      isPhone: false,
      phones: [],
      title: ""
    }
  },
  computed:{
    ...mapState('help',['loading','helps'])
  },
  methods:{
    ...mapActions('help',['getHelp']),
    openLink(contactType){
      let contactUrl = "";

      if(contactType.ChatType == 1){
        contactUrl = `https://facebook.com/${contactType.url}`
      }
      if(contactType.ChatType == 2){
        contactUrl = `https://t.me/${contactType.url}`
      }
      ipcRenderer.send("openLink",contactUrl)
    },
    showPhone(phones){
      this.title = phones.title
      this.isPhone = true
      this.phones = phones.phone
    },
    back(){
      this.$router.go(-1);
    }
  },
  mounted(){
    this.getHelp()
  }
}
</script>
