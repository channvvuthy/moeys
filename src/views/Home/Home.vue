<template>
  <div class="p-5 bg-forest h-full">
    <div class="uppercase font-semibold text-primary">សួស្តី {{auth.user.first_name}} {{auth.user.last_name}}!</div>
    <div>
      <div class="h-10 w-96 border border-gray-200 rounded-md px-3 bg-white mt-5 flex items-center justify-between cursor-pointer">
        <div>
          ជ្រើរើសកម្រិតថ្នាក់
        </div>
        <div>
          <ArrowDownIcon :size="22"></ArrowDownIcon>
        </div>
      </div>
      <!-- List -->
      <div class="grid grid-cols-4 mt-5 gap-5">
        <div class="bg-pink-500 rounded p-5">1</div>
        <div class="bg-green-500 rounded p-5">1</div>
        <div class="bg-purple-500 rounded p-5">1</div>
        <div class="bg-blue-500 rounded p-5">1</div>
        <div class="bg-pink-500 rounded p-5">1</div>
        <div class="bg-green-500 rounded p-5">1</div>
        <div class="bg-purple-500 rounded p-5">1</div>
        <div class="bg-blue-500 rounded p-5">1</div>
        
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {mapState} from "vuex"
import ArrowDownIcon from "./../../components/ArrowDownIcon.vue"
export default {
  name: 'Home',
  components: {
    ArrowDownIcon
  },
  computed:{
    ...mapState('auth', ['token','auth'])
  },
  created(){
    if(!this.token){
      this.$router.push({name:"SplashScreen"});
    }

  }
}
</script>
