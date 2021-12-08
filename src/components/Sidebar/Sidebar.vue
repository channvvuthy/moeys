<template>
    <div class="h-screen bg-primary text-white py-5 overflow-y-scroll font-mono text-sm" :style="{width:sidebarWidth + `px`}">
        <!-- Profile -->
        <div>
            <div v-if="auth.user.photo">
            </div>
            <div v-else class="flex justify-center items-center w-full">
                <DefaultProfileIcon></DefaultProfileIcon>
            </div>
            <div class="text-center">
                {{ auth.user.first_name }} {{ auth.user.last_name }}
            </div>
            <!-- Menu -->
            <ul class="menu mt-5">
                <li class="flex items-center">
                    <DownloadIcon fill="#FFF"></DownloadIcon>
                    <p class="ml-4">ដោនឡូត</p>
                </li>
                <li class="flex items-center">
                    <FavoriteIcon fill="#FFF"></FavoriteIcon>
                    <p class="ml-4">ចូលចិត្ត</p>
                </li>
                <li class="flex items-center">
                    <CalendarIcon fill="#FFF"></CalendarIcon>
                    <p class="ml-4">កាលវិភាគសិក្សា</p>
                </li>
                <li class="flex items-center">
                    <SwitchIcon fill="#FFF"></SwitchIcon>
                    <p class="ml-4">ផ្លាស់ប្តូរគណនី</p>
                </li>
                <li class="flex items-center">
                    <HistoryIcon fill="#FFF"></HistoryIcon>
                    <p class="ml-4">ប្រវត្តិប្រើប្រាស់</p>
                </li>
                <li class="flex items-center">
                    <CommentIcon fill="#FFF"></CommentIcon>
                    <p class="ml-4">បញ្ចេញមតិ</p>
                </li>
                <li class="flex items-center">
                    <AboutIcon fill="#FFF"></AboutIcon>
                    <p class="ml-4">អំពីយើង</p>
                </li>
                <li class="flex items-center">
                    <ShareIcon fill="#FFF"></ShareIcon>
                    <p class="ml-4">ចែករំលែក</p>
                </li>
                <li class="flex items-center">
                    <QuestionIcon fill="#FFF"></QuestionIcon>
                    <p class="ml-4">របៀបប្រើប្រាស់</p>
                </li>
                <li class="flex items-center">
                    <HeadPhoneIcon fill="#FFF"></HeadPhoneIcon>
                    <p class="ml-4">ជំនួយបន្ថែម</p>
                </li>
                <li class="flex items-center">
                    <LogoutIcon fill="#FFF"></LogoutIcon>
                    <p class="ml-4">ចាកចេញ</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
import DefaultProfileIcon from "./../../components/DefaultProfileIcon.vue"
import DownloadIcon from "./../../components/DownloadIcon.vue"
import FavoriteIcon from "./../../components/FavoriteIcon.vue"
import CalendarIcon from "./../../components/CalendarIcon.vue"
import SwitchIcon from "./../../components/SwitchIcon.vue"
import HistoryIcon from "./../../components/HistoryIcon.vue"
import CommentIcon from "./../../components/CommentIcon.vue"
import AboutIcon from "./../../components/AboutIcon.vue"
import ShareIcon from "./../../components/ShareIcon.vue"
import QuestionIcon from "./../../components/QuestionIcon.vue"
import HeadPhoneIcon from "./../../components/HeadPhoneIcon.vue"
import LogoutIcon from "./../../components/LogoutIcon.vue"

export default {
    components:{
        DefaultProfileIcon,
        DownloadIcon,
        FavoriteIcon,
        CalendarIcon,
        SwitchIcon,
        HistoryIcon,
        CommentIcon,
        AboutIcon,
        ShareIcon,
        QuestionIcon,
        HeadPhoneIcon,
        LogoutIcon
        
    },
    computed:{
        ...mapState('auth', ['auth']),
        ...mapState('layout', ['sidebarWidth'])
    },
    created(){
        console.log(this.auth)
    }
}
</script>
<style>
    .menu li{
        padding:10px 15px;
        cursor: pointer;
    }
</style>