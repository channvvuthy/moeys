<template>
    <div class="fixed w-full h-full flex-col z-50 login py-10">
        <div class="absolute left-2 top-4 cursor-pointer">
            <div class="flex items-center" @click="() =>{this.$emit('back')}">
                <BackIcon fill="#FFF"></BackIcon>
            </div>
        </div>
        <div class="absolute right-4 top-4 cursor-pointer">
            <div class="flex items-center text-sm" @click="()=>{this.$router.push({name:'Help'})}">
                ជំនួយ
            </div>
        </div>
        <div v-if="loading" class="fixed left-0 top-0 z-50 flex items-center justify-center w-full h-full">
            <div>
                <LoadingIndicator :bg="false"></LoadingIndicator>
            </div>
        </div>
        <div v-else class="h-screen overflow-y-scroll px-5 mt-5 pb-20">
            <div class="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7">
                <div v-for="(instruction, index) in instructions" :key="index" class="mb-12 cursor-pointer" @click="instructionDetail(instruction)">
                    <div class="rounded-t-md h-full bg-gray-100 flex relative items-center justify-center overflow-hidden">
                        <img :src="instruction.thumbnail" class="m-auto">
                        <div class="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                            <div class="absolute w-10 h-5 rounded text-center bg-black bg-opacity-50 text-xs flex items-center justify-center right-4 bottom-10">
                                {{ instruction.duration }}
                            </div>
                            <div class="w-16 h-12 bg-black flex items-center justify-center rounded-lg bg-opacity-70">
                                <PlayIcon></PlayIcon>
                            </div>
                        </div>
                    </div>
                    <div class="text-black bg-white rounded-b-md h-12 flex items-center px-5">
                        {{ cutString(instruction.title,28) }}
                    </div>
                </div>
            </div>
        </div>
        <template v-if="isVideo">
            <Video :vidId="vidId" @closeVideo="closeVideo"></Video>
        </template>
        
    </div>
</template>
<script>
import EyeIcon from "./../../../components/EyeIcon.vue"
import BackIcon from "./../../../components/BackIcon.vue"
import {mapActions, mapState} from "vuex"
import LoadingIndicator from "./../../../components/LoadingIndicator.vue"
import helper from "./../../../helper/index"
import PlayIcon from "./../../../components/PlayIcon.vue"
import Video from "./../../../components/Video/Popup.vue"
export default {
    components:{
        EyeIcon,
        BackIcon,
        LoadingIndicator,
        PlayIcon,
        Video
    },
    data(){
        return{
            gender: "m",
            vidId: null,
            isVideo: false,
        }
    },
    computed:{
        ...mapState('instruction', ['loading','instructions'])
    },
    methods:{
        ...mapActions('instruction', ['getInstruction']),
        closeVideo(){
            this.isVideo = false
        },
        cutString(text, limit){
            return helper.cutString(text, limit);
        },
        instructionDetail(instruction){
            this.vidId = instruction.vidId
            this.isVideo = true
        },
    },
    mounted(){
        this.getInstruction();
    }
}
</script>