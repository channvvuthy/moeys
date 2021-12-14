<template>
    <div class="h-full font-mono">
        <div class="flex flex-col items-center justify-center" v-if="loading" :style="{height:`${screenHeight}px`}">
            <div>
                <LoadingIndicator></LoadingIndicator>
            </div>
        </div>
        <div v-else>
            <div class="flex p-5">
                <div class="left">
                    <Media :videos="videos[`videoInfo`][`video`]"></Media>
                    <div class="mt-5 border-b pb-3">
                        <div class="text-lg flex justify-between items-center">
                            <div>
                                <div>
                                    {{ videos.videoInfo.lessonTitle }} {{ videos.videoInfo.lessonIsPart }}
                                </div>
                                
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm text-gray-500 font-thin">
                                    ចំនួនអ្នកទស្សនា {{ videos.videoInfo.views }} នាក់
                                </div>
                                <div class="cursor-pointer mx-4">
                                    <FavoriteIcon :size="18" fill="#6b7280"></FavoriteIcon>
                                </div>
                                <div class="cursor-pointer">
                                    <DownloadIcon :size="18" fill="#6b7280"></DownloadIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex mt-5 items-center">
                        <div>
                            <div class="w-14 h-14 rounded-full bg-profile flex items-center justify-center">
                                <DefaultProfileIcon :size="35" fill="#FFF"></DefaultProfileIcon>
                            </div>
                        </div>
                        <div class="w-full mx-3">
                            <textarea class="w-full border rounded-full outline-none text-sm px-4 h-12 py-3" placeholder="បញ្ចេញមតិ"></textarea>
                        </div>
                        <div class="cursor-pointer">
                            <ImageIcon :size="40" fill="#bababa"></ImageIcon>
                        </div>
                    </div>
                    <!-- List of comment -->
                    <ul class="mt-5 overflow-y-scroll max-h-96">
                        <div v-if="loadingComment" class="flex items-center justify-center">
                            <LoadingIndicator></LoadingIndicator>
                        </div>
                        <template v-else>
                            <li v-for="(comment, index) in comments.data" :key="index" class="mb-5">
                               <div class="flex">
                                   <div>
                                       <div class="w-14 h-14 rounded-full bg-profile flex items-center justify-center bg-cover bg-center" :style="{backgroundImage:`url(${comment.photo})`}">
                                          <template v-if="!comment.photo">
                                               <DefaultProfileIcon :size="35" fill="#FFF"></DefaultProfileIcon>
                                          </template>
                                    </div>
                                   </div>
                                    <div class="ml-3 w-full">
                                        <div class="font-semibold flex items-center">
                                            <div>
                                                {{ comment.username }} 
                                            </div>
                                            <div class="ml-2 text-xs text-gray-400 font-thin">
                                                <timeago :datetime="comment.cmt_date"></timeago>
                                            </div>
                                        </div>
                                        <div class="text-xs mt-1">
                                            {{ comment.comment }}
                                        </div>
                                        <div class="flex items-center xs text-gray-500 mt-2 cursor-pointer">
                                            <div class="flex items-center justify-end">
                                                <ForumIcon :size="18" fill="#6b7280"></ForumIcon>
                                                <div class="ml-1">
                                                    {{comment.sub_cmt_count}} មតិយោបល់
                                                </div>
                                            </div> 
                                            <div class="flex items-center justify-end ml-5">
                                                <ReplyIcon :size="18" fill="#6b7280"></ReplyIcon>
                                                <div class="ml-1">
                                                    ឆ្លើយតប
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    
                               </div>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="right pl-2">
                    <div class="font-mono font-semibold text-black">
                       <div>
                          <ul class="flex items-center h-11 text-sm border-b-4 border-primary">
                              <li class="w-32 relative tab text-white cursor-pointer h-full flex items-center justify-center bg-primary">មេរៀនបន្ទាប់</li>
                              
                          </ul>
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
import CommentIcon from "./../../components/CommentIcon.vue"
import FileIcon from "./../../components/FileIcon.vue"
import ImageIcon from "./../../components/ImageIcon.vue"
import ForumIcon from "./../../components/ForumIcon.vue"
import ReplyIcon from "./../../components/ReplyIcon.vue"
import DefaultProfileIcon from "./../../components/DefaultProfileIcon.vue"
import Vue from "vue"
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    en: require('date-fns/locale/en')
  }
})
export default {
    components:{
        LoadingIndicator,
        FavoriteIcon,
        Media,
        DownloadIcon,
        CommentIcon,
        FileIcon,
        ImageIcon,
        DefaultProfileIcon,
        ForumIcon,
        ReplyIcon
    },
    data(){
        return{
            page: 1,
            per_page: 50,
            loadingComment: false,
            
        }
    },
    computed:{
        ...mapState('video', ['videos','loading']),
        ...mapState('layout', ['screenHeight']),
        ...mapState('comment', ['comments']),
        
    },
    methods:{
         ...mapActions('video', ['getVideo']),
         ...mapActions('comment', ['getComment'])
    },
    created(){
        let vidId = this.$route.params.vidId
        this.getVideo(vidId)
        this.loadingComment = true
        this.getComment({
            less_id: this.$route.params.lessonId,
            page: this.page,
            per_page: this.per_page
        }).then(()=>{
            this.loadingComment = false
        })
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
    .tab:after{
        content: "";
        position: absolute;
        right:-40px;
        border-color:#174B7C;
        border-width:20px;
        border-top-color: transparent;
        border-right-color: transparent;
    }
</style>