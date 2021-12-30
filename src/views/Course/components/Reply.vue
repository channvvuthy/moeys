<template>
    <div class="fixed items-center flex justify-center bg-black bg-opacity-80 left-0 top-0 w-full h-full">
        <div class="w-96 bg-white rounded-xl shadow">
            <div class="flex items-center justify-between px-3 py-3 relative border-b">
                <div class="w-full text-center">មតិយោបល់</div>
                <div class="bg-forest rounded-full w-7 h-7 flex items-center justify-center absolute -right-2 -top-4 shadow cursor-pointer" @click="()=>{this.$emit('closeisReply')}">
                    <div>
                        <CloseIcon></CloseIcon>
                    </div>
                </div>
            </div>
            <ul>
                <li class="flex mx-3 px-3 py-1 rounded-xl my-3 justify-between bg-forest">
                    <div class="flex items-center">
                        <div>
                            <div class="h-14 w-14 bg-forest rounded-full flex items-center justify-center" :style="{backgroundImage:`url(${comment.photo})`}">
                                <template v-if="!comment.photo">
                                    <DefaultProfileIcon :size="35" fill="#FFF"></DefaultProfileIcon>
                                </template>
                            </div>
                        </div>
                        <div class="ml-3">
                            <div class="capitalize">
                               {{ comment.username }}
                            </div>
                            <div class="text-sm">
                                {{ comment.comment }}
                            </div>
                            <div class="text-sm w-32" v-if="comment.comments_photo">
                               <img :src="comment.comments_photo">
                            </div>
                        </div>
                    </div>
                    <div class="ml-2 text-xs text-gray-400 font-thin">
                        <timeago :datetime="comment.cmt_date"></timeago>
                    </div>
                </li>
            </ul>
            <div class="h-96 flex flex-col justify-between">
                <ul class="h-96 overflow-y-scroll">
                    <li v-for="(comment,index) in comments" :key="index" class="px-3 mb-3 justify-between">
                        <div class="flex items-center">
                            <div>
                                <div class="h-14 w-14 bg-forest rounded-full flex items-center justify-center" :style="{backgroundImage:`url(${comment.photo})`}">
                                    <template v-if="!comment.photo">
                                        <DefaultProfileIcon :size="35" fill="#FFF"></DefaultProfileIcon>
                                    </template>
                                </div>
                            </div>
                            <div class="ml-3">
                                <div class="capitalize">
                                {{ comment.username }}
                                </div>
                                <div class="text-sm">
                                    {{ comment.comment }}
                                </div>
                                <div class="text-sm w-32" v-if="comment.comments_photo">
                                <img :src="comment.comments_photo">
                                </div>
                            </div>
                        </div>
                        <div class="ml-2 text-xs text-gray-400 font-thin">
                            <timeago :datetime="comment.cmt_date"></timeago>
                        </div>
                    </li>
                </ul>
                <div class="flex items-center px-3 mb-3 relative">
                    <textarea class="border w-full h-10 rounded-full text-sm px-3 outline-none py-2" style="resize: none;" placeholder="បញ្ចេញមតិ"></textarea>
                    <div class="ml-3 cursor-pointer">
                        <ImageIcon :size="40" fill="#bababa"></ImageIcon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CloseIcon from "./../../../components/CloseIcon.vue"
import DefaultProfileIcon from "./../../../components/DefaultProfileIcon.vue"
import ImageIcon from "./../../../components/ImageIcon.vue"
import {mapActions} from "vuex"
import Vue from "vue"
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'Timeago', 
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    en: require('date-fns/locale/en')
  }
})
export default {
    props:{
        comment:{},
    },
    data(){
        return{
            comments:[]
        }
    },
    components:{
        CloseIcon,
        DefaultProfileIcon,
        ImageIcon
    },
    methods:{
        ...mapActions('comment', ['getSubComment'])
    },
    created(){
        this.getSubComment(this.comment.cmt_id).then(res=>{
            this.comments = res.data.data
        });
    }
}
</script>