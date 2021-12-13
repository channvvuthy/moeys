<template>
    <div class="fixed w-full h-full left-0 top-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
        <div v-if="loading">
            <LoadingIndicator :bg="false"></LoadingIndicator>
        </div>
        <div v-else>
            
            <div class="relative" @mouseover="() => {this.isTool = true}" @mouseleave="() =>{this.isTool = false}">
                <div class="absolute z-50 -top-4 -right-3 bg-primary shadow cursor-pointer w-8 h-8 flex items-center justify-center rounded-full" @click="closeVideo">
                    <CloseIcon fill="#e5e7eb" :width="25"></CloseIcon>
                </div>
                <video id="moeys" class="w-5xl" 
                        loop
                        @timeupdate="timeUpdate()"
                        @ended="onEnded()"
                        @click="playPause()"
                        autoplay="autoplay"
                        controlsList="nodownload">
                    <source :src="vdUrl" type="video/mp4">
                </video>
                <div class="m-auto h-10 px-5 absolute left-0 bottom-3 w-full" :class="isTool?`visible`:`invisible`" >
                    <div class="bg-black bg-opacity-70 px-5 flex items-center w-full h-10 rounded-md">
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
                        <div class="flex itesm-center justify-center mx-5 w-40">
                            <input id="volumeSlider" type="range" min="0" max="100" v-model="audioVolume" step="1"  @change="setVolume($event)" class="w-full">
                        </div>
                        <div class="cursor-pointer" @click="resizeScreen">
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
const {ipcRenderer} = require("electron")
export default {
    components:{
        LoadingIndicator,
        RedoIcon,
        UndoIcon,
        PlayIcon,
        SoundIcon,
        PauseIcon,
        MuteIcon,
        ResizeIcon,
        CloseIcon
    },
    props:{
        vidId:{
            default:()=>{
                return ""
            }
        }
    },
    data(){
        return{
            video:[],
            isPlay: false,
            isTool: false,
            vdUrl: "",
            loading: false,
            muted: false,
            vid: null,
            btn: null,
            currentWatch: "",
            seekSlider: null,
            currentTime: null,
            currentDuration: null,
            muteBtn: null,
            volumeSlider: null,
            audioVolume: 100,
            oldVolume: 0,
            fullScreenBtn: null,
            seek: 0,
        }
    },
    methods:{
        ytInfo(){
             ipcRenderer.send("ytInfo",this.vidId)
        },
        playPause(){
            if (this.vid.paused) {
                this.vid.play();
                this.isPlay = false
            } else {
                this.vid.pause();
                this.isPlay = true
            }
        },
        resizeScreen(){
            if (this.vid.requestFullScreen) {
                this.vid.requestFullScreen();
            } else if (this.vid.webkitRequestFullScreen) {
                this.vid.webkitRequestFullScreen();
            } else if (this.vid.mozRequestFullScreen) {
                this.vid.mozRequestFullScreen();
            }
        },
        increaseTime(){
            this.vid.currentTime += 5
        },
        decreaseTime(){
            if (this.vid.currentTime > 5) {
                this.vid.currentTime -= 5
            }
        },
        timeUpdate(){
            let nt = Math.floor(this.vid.currentTime * (100 / this.vid.duration));
            this.seek = nt
            let color = `linear-gradient(90deg, rgb(255, 14, 9) ${nt}%, rgb(214,214,214) ${nt}%)`
            this.seekSlider.style.background = color
            this.currentWatch = this.vid.currentTime

            let curmins = Math.floor(this.vid.currentTime / 60);
            let cursecs = Math.floor(this.vid.currentTime - curmins * 60);
            let durmins = Math.floor(this.vid.duration / 60);
            let dursecs = Math.floor(this.vid.duration - durmins * 60);
            if (cursecs < 10) {
                cursecs = "0" + cursecs;
            }
            if (dursecs < 10) {
                dursecs = "0" + dursecs;
            }
            if (curmins < 10) {
                curmins = "0" + curmins;
            }
            if (durmins < 10) {
                durmins = "0" + durmins;
            }
            if (curmins && cursecs) {
                this.currentTime.innerHTML = curmins + ":" + cursecs + "&nbsp;";
            }
            if (durmins && dursecs) {
                this.currentDuration.innerHTML = "/&nbsp;" + durmins + ":" + dursecs;
            }

        },
        onEnded(){
            this.isPlay = true
        },
        setVolume(event){
            this.vid.volume = this.volumeSlider.value / 100;
            this.oldVolume = this.volumeSlider.value / 100;
            let color = `linear-gradient(90deg, rgb(3, 117, 255) ${event.target.value}%, rgb(214,214,214) ${event.target.value}%)`
            this.volumeSlider.style.background = color
            
        },
        volumeSeekbarStyle(){
            let volume = 0;
            if(!this.muted){
                volume = this.oldVolume ? this.oldVolume : 1
            }
            volume = volume * 100
            this.audioVolume = volume
            let color = `linear-gradient(90deg, rgb(3, 117, 255) ${volume}%, rgb(214,214,214) ${volume}%)`
            this.volumeSlider.style.background = color
        },
        vidMute(){
            if (this.vid.muted) {
                this.vid.muted = false;
                this.muted = false
                this.vid.volume = this.oldVolume ? this.oldVolume : 1
            } else {
                this.muted = true
                this.vid.muted = true;
                this.vid.volume = 0
            }
            this.volumeSeekbarStyle()
            
        },
        getVideo(){
            let interval = setInterval(() => {
                if (document.getElementById("moeys") !== null) {
                    clearInterval(interval)
                    this.vid = document.getElementById("moeys")
                    this.btn = document.getElementById("playPauseBtn");
                    this.seekSlider = document.getElementById("seekSlider");

                    this.seekSlider.addEventListener("input", (event) => {
                        let seekTo = this.vid.duration * (event.target.value / 100);
                        let color = `linear-gradient(90deg, rgb(255, 14, 9) ${event.target.value}%, rgb(214,214,214) ${event.target.value}%)`
                        this.seekSlider.style.background = color
                        this.vid.currentTime = seekTo
                    }, true);

                    this.currentTime = document.getElementById("currentTime");
                    this.currentDuration = document.getElementById("currentDuration");
                    this.muteBtn = document.getElementById("muteBtn");
                    this.volumeSlider = document.getElementById("volumeSlider");
                    this.fullScreenBtn = document.getElementById("fullScreenBtn");

                    let color = `linear-gradient(90deg, rgb(3, 117, 255) ${this.audioVolume}%, rgb(214,214,214) ${this.audioVolume}%)`
                    this.volumeSlider.style.background = color
                }
            }, 200)
        },
        closeVideo(){
            this.$emit("closeVideo")
        }
    },
    mounted(){
         this.getVideo()
    },
    created(){
        this.loading = true
        this.ytInfo()

        ipcRenderer.on("ytInfo",(event, data) =>{
           this.loading = false
           this.video = data
           this.vdUrl = this.video[1].url
           // on deconstruct
            ipcRenderer.removeAllListeners('ytInfo')
        })

        
    }
}
</script>
<style>
    .seekSlider{
        -webkit-appearance: none;
        width: 100%;
        height: 6px;
        background: linear-gradient(90deg, rgb(255, 14, 9) 0%, rgb(214, 214, 214) 0%);
        outline: none;
        box-shadow: 0px 1px 10px black;
        cursor: pointer;
        border-radius: 6px;
    }
    .seekSlider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        background: #ff0e09;
        cursor: pointer;
        border-radius: 12px;
    }
    #volumeSlider{
        -webkit-appearance: none;
         background: linear-gradient(90deg, rgb(3, 117, 225) 0%, rgb(214, 214, 214) 0%);
         height: 6px;
         border-radius: 6px;
    }
    #volumeSlider::-webkit-slider-thumb {
      background: #ff0e09 !important;
    }

    
    .w-5xl{
        width: 64rem;
    }
</style>