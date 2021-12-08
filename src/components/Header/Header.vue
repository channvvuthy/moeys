<template>
    <div class="h-14 shadow flex justify-between items-center px-5" :style="{width:sreenWidth + `px`}">
        <div class="cursor-pointer" @click="toggleSidebar">
            <NavigationIcon></NavigationIcon>
        </div>
        {{ sreenWidth }} -{{ sidebarWidth }}
        <div class="flex items-center justify-end">
            <div class="cursor-pointer">
                <SearchIcon></SearchIcon>
            </div>
            <div class="mx-7 cursor-pointer">
                <GraphIcon></GraphIcon>
            </div>
            <div class="cursor-pointer">
                <NotificationIcon></NotificationIcon>
            </div>
        </div>

    </div>
</template>
<script>
import NavigationIcon from "./../NavigationIcon.vue"
import NotificationIcon from "./../NotificationIcon.vue"
import SearchIcon from "./../SearchIcon.vue"
import GraphIcon from "./../GraphIcon.vue"
import { mapState } from 'vuex'
export default {
    components:{
        NavigationIcon,
        SearchIcon,
        NotificationIcon,
        GraphIcon
    },
    data(){
        return{
            sreenWidth: null,
            oldScreenWidth: null
        }
    },
    computed:{
        ...mapState('layout', ['sidebarWidth'])
    },
    methods:{
        handleResize() {
            this.sreenWidth = window.innerWidth;
            this.oldScreenWidth = window.innerWidth;
        },
        toggleSidebar(){
            if(this.sidebarWidth == 0){
                this.$store.commit("layout/setWidth", 300)
                this.sreenWidth = parseInt(this.sreenWidth) - 300
            }else{
               this.$store.commit("layout/setWidth", 0) 
               this.sreenWidth = this.oldScreenWidth
            }
        }
    },
    created(){
        this.toggleSidebar();
        this.handleResize();
    }
}
</script>
<style scoped>

</style>