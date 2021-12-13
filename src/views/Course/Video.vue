<template>
    <div class="h-full">
        <div class="flex flex-col items-center justify-center" v-if="loading" :style="{height:`${screenHeight}px`}">
            <div>
                <LoadingIndicator></LoadingIndicator>
            </div>
        </div>
        <div v-else>
            <div class="flex p-5">
                <div class="left">
                    <Media :videos="videos[`videoInfo`][`video`]"></Media>
                    <div class="mt-3">
                        <div class="text-lg">
                            {{ videos.videoInfo.lessonTitle }} {{ videos.videoInfo.lessonIsPart }}
                        </div>
                    </div>
                </div>
                <div class="right pl-2">
                    <div class="font-mono font-semibold text-primary">
                       <div class="flex items-center border-b-4 pb-2 border-primary border-double">
                           <svg aria-hidden="true" width="25" focusable="false" data-prefix="far" data-icon="video" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-video fa-w-18 fa-3x">
                                <path fill="currentColor" d="M543.9 96c-6.2 0-12.5 1.8-18.2 5.7L416 170.1v-58.3c0-26.4-23.2-47.8-51.8-47.8H51.8C23.2 64 0 85.4 0 111.8v288.4C0 426.6 23.2 448 51.8 448h312.4c28.6 0 51.8-21.4 51.8-47.8v-58.3l109.7 68.3c5.7 4 12.1 5.7 18.2 5.7 16.6 0 32.1-13 32.1-31.5V127.5C576 109 560.5 96 543.9 96zM368 200v198.9c-.6.4-1.8 1.1-3.8 1.1H51.8c-2 0-3.2-.6-3.8-1.1V113.1c.6-.4 1.8-1.1 3.8-1.1h312.4c2 0 3.2.6 3.8 1.1V200zm160 155.2l-112-69.8v-58.7l112-69.8v198.3z" class=""/>
                            </svg>
                            <div class="ml-3">
                                មេរៀនបន្ទាប់
                            </div>
                        </div> 
                        <ul class="mt-3 overflow-y-scroll pb-10" :style="{height:`${screenHeight}px`}">
                            <li v-for="(video, index) in videos.videoList" :key="index" class="py-3">
                                <div class="flex">
                                    <div class="mr-3 cursor-pointer">
                                        <img :src="video.lessonThumbnail" class="w-24">
                                    </div>
                                    <div class="text-sm">
                                        <div class="text-black cursor-pointer">{{ video.lessonTitle }}</div>
                                        <div class="flex">
                                            <div class="xs mt-1 text-gray-500 font-thin">
                                                {{ video.lessonIsPart }}
                                            </div>
                                            <div class="xs mt-1 text-gray-500 ml-2">
                                                រយៈពេល {{ video.lessonDuration  }}នាទី
                                            </div>
                                        </div>
                                        <div class="mt-2 flex">
                                            <div class="cursor-pointer">
                                                <FavoriteIcon :size="14" fill="#6b7280"></FavoriteIcon>
                                            </div>
                                            <div class="mx-3 cursor-pointer">
                                                <DownloadIcon :size="14" fill="#6b7280"></DownloadIcon>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from "vuex"
import LoadingIndicator from "./../../components/LoadingIndicator.vue"
import Media from "./../../components/Video/Media.vue"
import FavoriteIcon from "./../../components/FavoriteIcon.vue"
import DownloadIcon from "./../../components/DownloadIcon.vue"
export default {
    components:{
        LoadingIndicator,
        FavoriteIcon,
        Media,
        DownloadIcon
    },
    computed:{
        ...mapState('video', ['videos','loading']),
        ...mapState('layout', ['screenHeight']),
        
    },
    methods:{
         ...mapActions('video', ['getVideo'])
    },
    created(){
        let vidId = this.$route.params.vidId
        this.getVideo(vidId)
    }
}
</script>
<style>
    .left{
        width: 69%;
        margin-right: 1%;
    }
    .right{
        width:30%;
    }
    .xs{
        font-size:10px;
    }
</style>