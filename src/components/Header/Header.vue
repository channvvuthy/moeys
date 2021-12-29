<template>
    <div class="h-14 shadow flex justify-between items-center px-5 relative" :style="{width:sreenWidth + `px`}">
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
                <input type="text" class="border rounded-full text-sm px-3 outline-none h-8 w-60" v-model="keyword" placeholder="ស្វែងរក មេរៀន" @keyup="exploreLesson">
            </div>
            <div class="mx-7 cursor-pointer">
                <GraphIcon></GraphIcon>
            </div>
            <div class="cursor-pointer">
                <NotificationIcon></NotificationIcon>
            </div>
        </div>
        <!-- Box result -->
        <template v-if="isSearch">
            <div class="absolute w-96 bg-white h-96 rounded-lg shadow right-32 top-17 box-result z-50" v-if="keyword">
                <div class="flex items-center justify-center h-96" v-if="loadingSearch">
                    <div>
                        <LoadingIndicator></LoadingIndicator>
                    </div>
                </div>
                <template v-else>
                    <ul class="overflow-y-scroll h-96 py-3" v-if="search.length">
                            <li v-for="(result, index) in search" :key="index" class="text-sm py-2 px-3 border-b cursor-pointer" @click="searchDetail(result.id)">
                                <p>{{result.title}}</p>
                            </li>
                        </ul>
                        <div v-else class="flex flex-col items-center justify-center h-96">
                            <div>
                                <NoResultIcon :size="50" fill="#6b7280"></NoResultIcon>
                            </div>
                            <div class="text-lg text-gray-500 font-mono">
                                ពុំទាន់មានទិន្នន័យ
                            </div>
                        </div>
                </template>
            </div>
        </template>
    </div>
</template>
<script>
import NavigationIcon from "./../NavigationIcon.vue"
import NotificationIcon from "./../NotificationIcon.vue"
import NoResultIcon from "./../NoResultIcon.vue"
import LoadingIndicator from "./../LoadingIndicator.vue"
import SearchIcon from "./../SearchIcon.vue"
import GraphIcon from "./../GraphIcon.vue"
import CloseIcon from "./../CloseIcon.vue"

import { mapState,mapActions } from 'vuex'
export default {
    components:{
        NavigationIcon,
        SearchIcon,
        NotificationIcon,
        GraphIcon,
        CloseIcon,
        LoadingIndicator,
        NoResultIcon
    },
    data(){
        return{
            sreenWidth: null,
            oldScreenWidth: null,
            isSearch: false,
            keyword: "",
        }
    },
    computed:{
        ...mapState('layout', ['sidebarWidth','sreenHeight']),
        ...mapState('course', ['search','loadingSearch'])
    },
    methods:{
        ...mapActions('course', ['getSearch']),
        exploreLesson(){
            if(this.keyword){
                this.getSearch(this.keyword);
            }
        },
        searchDetail(vidId){
            this.$router.push({
                name:"Search",
                params:{vidId:vidId}
            })
            this.showSearch()
        },
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
<style>
    .box-result:after{
        content:"";
        position: absolute;
        top:0;

        right:25px;
        width:0px;
        height: 0px;
        border-color: white;
        margin-top: -30px;
        border-width: 15px;
        transform: rotate(-90deg);
        border-bottom-color: transparent;
        border-top-color: transparent;
        border-right-color: transparent;
        /* bord */

    }
</style>