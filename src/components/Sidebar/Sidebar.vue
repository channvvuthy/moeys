<template>
    <div class="h-screen bg-tertiary text-white" :style="{width:sidebarWidth + `px`}">
        <!-- Profile -->
        <div>jj</div>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    computed:{
        ...mapState('auth', ['auth']),
        ...mapState('layout', ['sidebarWidth'])
    },
    created(){
        console.log(this.auth)
    }
}
</script>