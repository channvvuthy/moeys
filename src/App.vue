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
import headerMoeys from './components/Header/Header.vue'
import sidebarMoeys from './components/Sidebar/Sidebar.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    headerMoeys,
    sidebarMoeys
  },
  computed: {
    ...mapState('auth', ['token']),
    ...mapState('layout', ['screenWidth']),
  },
  data () {
    return {
      durationUsing: 1000
    }
  },
  methods: {
    ...mapActions('graph', ['postUsage']),
    isAuthenticated () {
      if (this.token) {
        let auth = JSON.parse(localStorage.getItem('auth'))
        this.$store.commit('auth/receivedAuth', auth)
      }
    },
    startUsingMoeys (isClear) {
      let startUsing = setInterval(() => {
        this.durationUsing++
      })
      if (isClear) {
        clearInterval(startUsing)
      }
    },
    saveUsage () {
      if (this.token) {
        this.postUsage(
          { duration: this.durationUsing }
        ).then(() => {
          this.startUsingMoeys(true)
          this.durationUsing = 1000
        })
      }
    }
  },
  created () {
    this.isAuthenticated()
    window.addEventListener('click', () => {
      this.startUsingMoeys(false)
    })

    window.addEventListener('blur', () => {
      this.saveUsage()
    })
    document.documentElement.addEventListener('mouseleave', () => {
      this.saveUsage()
    })

  }
}
</script>
<style>
body {
  overflow-y: hidden;
}
</style>
