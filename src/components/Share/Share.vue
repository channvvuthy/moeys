<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
    <div class="bg-white text-black shadow rounded-xl p-5 w-80 relative">
      <div class="w-8 h-8 rounded-full bg-forest -right-2 -top-4 cursor-pointer
       flex items-center justify-center absolute"
           @click="()=>{this.$emit('closeShare')}"
      >
        <CloseIcon></CloseIcon>
      </div>
      <div class="text-lg font-black">ចែករំលែក</div>
      <div class="grid grid-cols-3 my-3">
        <div class="cursor-pointer" @click="openLink(facebookUrl)">
          <FacebookIcon fill="#3a5693" :size="60"></FacebookIcon>
        </div>
        <div class="cursor-pointer" @click="openLink(linkedInUrl)">
          <InIcon fill="#0273af" :size="60"></InIcon>
        </div>
        <div class="cursor-pointer"@click="openLink(telegramUrl)">
          <TelegramIcon fill="#f43380" :size="65"></TelegramIcon>
        </div>
      </div>
     <div class="flex items-center">
       <input type="text" class="h-10 border rounded-l-md outline-none w-full px-3 mt-3" ref="share" :value="url">
       <button class="bg-primary h-10 text-white px-5 mt-3 rounded-r-md" @click="copyText">Copy</button>
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
export default {
  data(){
    return{
      url: "www.moeys.gov.kh/en/",
      facebookUrl: "https://www.facebook.com/sharer/sharer.php?u=http://www.moeys.gov.kh/en/",
      linkedInUrl: "https://www.linkedin.com/sharing/share-offsite/?url=http://www.moeys.gov.kh/en/",
      telegramUrl: "https://t.me/share/url?url=http://www.moeys.gov.kh/en/&text=Moeys",
      instagramUrl: "",
    }
  },
  components:{
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
