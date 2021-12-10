<template>
    <div class="h-14 shadow flex justify-between items-center px-5" :style="{width:sreenWidth + `px`}">
        <div class="cursor-pointer" @click="toggleSidebar">
            <NavigationIcon></NavigationIcon>
        </div>
        <div class="flex items-center justify-end">
            <div class="cursor-pointer" v-if="!isSearch" @click="showSearch">
                <SearchIcon></SearchIcon>
            </div>
            <div class="relative" v-else>
                <div class="absolute right-2 top-1 cursor-pointer" style="margin-top:2px;" @click="showSearch">
                    <CloseIcon :height="20"></CloseIcon>
                </div>
                <input type="text" class="border rounded-full text-sm px-3 outline-none h-8 w-60" placeholder="ស្វែងរក មេរៀន">
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
import CloseIcon from "./../CloseIcon.vue"
import { mapState } from 'vuex'
export default {
    components:{
        NavigationIcon,
        SearchIcon,
        NotificationIcon,
        GraphIcon,
        CloseIcon
    },
    data(){
        return{
            sreenWidth: null,
            oldScreenWidth: null,
            isSearch: false
        }
    },
    computed:{
        ...mapState('layout', ['sidebarWidth'])
    },
    methods:{
        showSearch(){
            this.isSearch =! this.isSearch
        },
        handleResize() {
            this.sreenWidth = window.innerWidth;
            this.oldScreenWidth = window.innerWidth;
            this.$store.commit("layout/setScreenWidth",this.sreenWidth)
        },
        toggleSidebar(){
            if(this.sidebarWidth == 0){
                this.$store.commit("layout/setWidth", 300)
                this.sreenWidth = parseInt(this.sreenWidth) - 300
            }else{
               this.$store.commit("layout/setWidth", 0) 
               this.sreenWidth = this.oldScreenWidth
            }
            this.$store.commit("layout/setScreenWidth",this.sreenWidth)
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