<template>
  <div>
    
  </div>
</template>

<script>
// @ is an alias to /src

import {mapState} from "vuex"
export default {
  name: 'Home',
  components: {
    
  },
  computed:{
    ...mapState('auth', ['token'])
  },
  created(){
    if(!this.token){
      this.$router.push({name:"SplashScreen"});
    }
  }
}
</script>
