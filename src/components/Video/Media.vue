<template>
    <div>
        <div class="w-full flex justify-center items-center w-full bg-black">
            <div class="relative">
                <div class="absolute flex cursor-pointer z-50  items-center justify-center h-8 w-8 bg-forest rounded-full left-2 top-2 rounded">
                    <div @click="()=>{$router.go(-1)}">
                        <BackIcon fill="#6b7280" :size="20"></BackIcon>
                    </div>
                </div>
                <video
                    id="Moeys"
                    autoplay
                    controlsList="nodownload"
                    @timeupdate="timeUpdate()"
                    @ended="onEnded()"
                    @click="playPause()"
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
                        <div class="cursor-pointer mr-5 relative" @click="()=>{this.isSetting =! this.isSetting}">
                            <!-- Quality -->
                            <div class="absolute bg-black text-white rounded w-36 bottom-9 pt-1 bg-opacity-90" v-if="isSetting">
                                <ul>
                                    <li class="px-3 py-2 border-b border-gray-700" >កំរិត</li>
                                    <li class="flex items-center justify-between px-3 py-2 border-b border-gray-700" @click="selectQuality(`360p`)">
                                        <span>360</span>
                                        <span v-if="quality == `360p`">
                                            <CheckIcon fill="#fff" :size="18"></CheckIcon>
                                        </span>
                                    </li>
                                    <li class="flex items-center justify-between px-3 py-2 border-b border-gray-700" @click="selectQuality(`720p`)">
                                        <span>720</span>
                                        <span v-if="quality == `720p`">
                                            <CheckIcon fill="#fff" :size="18"></CheckIcon>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                             <SettingIcon :size="22" fill="#d1d5db"></SettingIcon>
                        </div>
                        <div class="cursor-pointer relative" @click="vidMute">
                            <MuteIcon v-if="muted" :size="22"></MuteIcon>
                            <SoundIcon :size="22" v-else></SoundIcon>
                        </div>
                        <div class="flex itesm-center justify-center ml-5 w-56">
                            <input id="volumeSlider" type="range" min="0" max="100" v-model="audioVolume" step="1"  @change="setVolume($event)" class="w-full">
                        </div>
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
import BackIcon from "./../BackBoldIcon.vue"
import RedoIcon from "./../RedoIcon.vue"
import PlayIcon from "./../PlayIcon.vue"
import UndoIcon from "./../UndoIcon.vue"
import SoundIcon from "./../SoundIcon.vue"
import PauseIcon from "./../PauseIcon.vue"
import MuteIcon from "./../MuteIcon.vue"
import ResizeIcon from "./../ResizeIcon.vue"
import SettingIcon from "./../SettingIcon.vue"
import CheckIcon from "./../CheckIcon.vue"
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
        ResizeIcon,
        SettingIcon,
        CheckIcon,
        BackIcon
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
            seek:0,
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
            isSetting: false,
            lastWatch: false,
            quality: '720p'
        }
    },
    methods:{
        selectQuality(qty){
            this.quality = qty
            this.defaultUrl = this.videos.filter(item => item.quality == qty).map(item => item.url)[0]
            this.lastWatch = this.vid.currentTime
            this.vid.src = this.defaultUrl
            this.vid.currentTime = this.lastWatch
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
        increaseTime(){
            this.vid.currentTime += 5
        },
        decreaseTime(){
            if (this.vid.currentTime > 5) {
                this.vid.currentTime -= 5
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
        onEnded(){
            this.$emit("onEnded")
        },
        setVolume(event){
            this.vid.volume = this.volumeSlider.value / 100;
            this.oldVolume = this.volumeSlider.value / 100;
            let color = `linear-gradient(90deg, rgb(3, 117, 255) ${event.target.value}%, rgb(214,214,214) ${event.target.value}%)`
            this.volumeSlider.style.background = color
            
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
                if (document.getElementById("Moeys") !== null) {
                    clearInterval(interval)
                    this.vid = document.getElementById("Moeys")
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
    },
    mounted(){
        this.getVideo()
    },
    created(){
        this.defaultUrl = this.videos[2][`url`]
    }
}
</script>