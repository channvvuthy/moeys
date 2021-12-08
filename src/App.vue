<template>
  <div id="app">
    <!-- Authenticated -->
    <div class="flex" v-if="token">
      <sidebarMoeys></sidebarMoeys>
      <div>
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
    ...mapState('auth', ['token'])
  }
}
</script>