<template>
  <div id="app" class="font-serif">
    <!-- Authenticated -->
    <div class="flex" v-if="token">
      <sidebarMoeys></sidebarMoeys>
      <div :style="{width:screenWidth + `px`}">
          <headerMoeys></headerMoeys>
          <router-view/>
      </div>
    </div>
    <!-- Unauthenticated -->
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>
<script>
import headerMoeys from "./components/Header/Header.vue"
import sidebarMoeys from "./components/Sidebar/Sidebar.vue"
import {mapState} from "vuex"
export default {
  components:{
    headerMoeys,
    sidebarMoeys
  },
  computed:{
    ...mapState('auth', ['token']),
    ...mapState('layout', ['screenWidth']),
  },
  methods:{
    isAuthenticated(){
      if(this.token){
        let auth = JSON.parse(localStorage.getItem("auth"));
        this.$store.commit("auth/receivedAuth", auth)
      }
    }
  },
  created(){
    this.isAuthenticated()
  }
}
</script>
<style>
  body{
    overflow-y: hidden;
  }
</style>
