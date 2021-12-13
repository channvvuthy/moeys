<template>
    <div>
        <div class="w-full flex justify-center items-center w-full bg-black">
            <div class="relative">
                <video
                >
                    <source :src="defaultUrl"/>
                </video>
                <!-- Tool -->
                <div class="absolute w-full bottom-4 left-0 w-full px-10">
                    <div class="h-10 w-full bg-black bg-opacity-70 rounded-md flex items-center px-5">
                        <div class=" cursor-pointer">
                            <div @click="decreaseTime">
                                <UndoIcon :size="18"></UndoIcon>
                            </div>

                        </div>
                        <div class="mx-5 cursor-pointer" id="playPauseBtn" @click="playPause()">
                            <PlayIcon fill="#fff" :size="18" v-if="isPlay"></PlayIcon>
                            <PauseIcon fill="#fff" :size="18" v-else></PauseIcon>
                        </div>
                        <div class=" cursor-pointer" @click="increaseTime">
                            <RedoIcon :size="18"></RedoIcon>
                        </div>
                        <div class="text-white ml-5 font-serif flex">
                            <span id="currentTime">00:</span>
                            <span id="currentDuration">00</span>
                        </div>
                        <div class="mx-5 w-full">
                            <input type="range" class="w-full seekSlider" min="0" max="100" id="seekSlider" v-model="seek" step="1">
                        </div>
                        <div class="cursor-pointer relative" @click="vidMute">
                            <MuteIcon v-if="muted" :size="22"></MuteIcon>
                            <SoundIcon :size="22" v-else></SoundIcon>
                        </div>
                        <!-- <div class="flex itesm-center justify-center mx-5 w-40">
                            <input id="volumeSlider" type="range" min="0" max="100" v-model="audioVolume" step="1"  @change="setVolume($event)" class="w-full">
                        </div> -->
                        <div class="cursor-pointer ml-5" @click="resizeScreen">
                             <ResizeIcon :size="22" fill="#d1d5db"></ResizeIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoadingIndicator from "./../LoadingIndicator.vue"
import CloseIcon from "./../CloseIcon.vue"
import RedoIcon from "./../RedoIcon.vue"
import PlayIcon from "./../PlayIcon.vue"
import UndoIcon from "./../UndoIcon.vue"
import SoundIcon from "./../SoundIcon.vue"
import PauseIcon from "./../PauseIcon.vue"
import MuteIcon from "./../MuteIcon.vue"
import ResizeIcon from "./../ResizeIcon.vue"
export default {
    components:{
        LoadingIndicator,
        CloseIcon,
        RedoIcon,
        PlayIcon,
        UndoIcon,
        SoundIcon,
        PauseIcon,
        MuteIcon,
        ResizeIcon
    },
    props:{
        videos:{
            default:()=>{
                return []
            }
        }
    },
    data(){
        return{
            defaultUrl: "",
            isPlay: false,
            audioVolume: 100,
        }
    },
    methods:{
        playPause(){

        },
        decreaseTime(){

        },
        increaseTime(){

        },
        resizeScreen(){

        },
        setVolume(){

        },
        vidMute(){}
    },
    created(){
        this.defaultUrl = this.videos[2][`url`]
    }
}
</script>