<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
    <div class="bg-white text-black shadow rounded-xl  w-80 relative">
      <div class="w-8 h-8 rounded-full bg-forest -right-2 -top-4 cursor-pointer
       flex items-center justify-center absolute"
           @click="()=>{this.$emit('closeShare')}"
      >
        <CloseIcon></CloseIcon>
      </div>
      <div class="text-lg font-black border-b px-5 py-3">ចែករំលែក</div>

      <div class="grid grid-cols-3 my-3 p-5 ">
        <div class="cursor-pointer flex justify-center" @click="openLink(androidUrl)">
          <AndroidIcon fill="#1f9978" :size="60"></AndroidIcon>
        </div>
        <div class="cursor-pointer flex justify-center" @click="openLink(iosUrl)">
          <AppStoreIcon fill="#0273af" :size="60"></AppStoreIcon>
        </div>
        <div class="cursor-pointer flex justify-center"@click="openLink(pcUrl)">
          <PcIcon fill="#1b2a4e" :size="65"></PcIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FacebookIcon from '@/components/FacebookIcon'
import InIcon from '@/components/InIcon'
import InstagramIcon from '@/components/InstagramIcon'
import TelegramIcon from '@/components/TelegramIcon'
import CloseIcon from '@/components/CloseIcon'
const {ipcRenderer} = require("electron")
import helper from '@/helper'
import AndroidIcon from '@/components/AndroidIcon'
import AppStoreIcon from '@/components/AppStoreIcon'
import PcIcon from '@/components/PcIcon'
export default {
  data(){
    return{
      url: "www.moeys.gov.kh/en/",
      pcUrl: "https://www.facebook.com/sharer/sharer.php?u=http://www.moeys.gov.kh/en/",
      iosUrl: "https://www.facebook.com/sharer/sharer.php?u=https://apps.apple.com/kh/app/moeys/id1551279703",
      androidUrl: "https://www.facebook.com/sharer/sharer.php?u=https://play.google.com/store/apps/details?id=gov.ministryedu.moeysapp",
    }
  },
  components:{
    PcIcon,
    AppStoreIcon,
    AndroidIcon,
    FacebookIcon,
    InIcon,
    InstagramIcon,
    TelegramIcon,
    CloseIcon
  },
  methods:{
    openLink(url){
      ipcRenderer.send("openLink",url)
    },
    copyText(){
      let Url = this.$refs.share;
      Url.innerHTML = window.location.href;
      Url.select();
      document.execCommand("copy");
      helper.success("Copied text: " + this.url)
    }
  }
}
</script>
