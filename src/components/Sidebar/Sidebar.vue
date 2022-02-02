<template>
    <div class="h-screen bg-primary text-white py-5 overflow-y-scroll font-mono text-sm" :style="{width:sidebarWidth + `px`}">
        <!-- Profile -->
        <div>
            <div v-if="auth.user.photo" class="flex justify-center items-center w-full mb-4 cursor-pointer">
                <div class="w-20 h-20 border rounded-full bg-cover" :style="{backgroundImage:url(`${auth.user.photo}`)}"></div>
            </div>
            <div v-else class="flex justify-center items-center w-full mb-4 cursor-pointer">
                <div class="w-20 h-20 bg-profile rounded-full flex items-center justify-center">
                    <DefaultProfileIcon :size="55" fill="#fff"></DefaultProfileIcon>
                </div>
            </div>
            <div class="text-center uppercase">
                {{ auth.user.first_name }} {{ auth.user.last_name }}
            </div>
            <!-- Menu -->
            <ul class="menu mt-5">
                <li class="flex items-center hover:bg-tertiary" :class="$route.name == `Home`?`bg-tertiary`:``" @click="goTo('Home')">
                    <HomeIcon fill="#FFF"></HomeIcon>
                    <p class="ml-4">ទំព័រដើម</p>
                </li>
                <li class="flex items-center hover:bg-tertiary" :class="$route.name == `Download`?`bg-tertiary`:``" @click="goTo('Download')">
                    <DownloadIcon fill="#FFF"></DownloadIcon>
                    <p class="ml-4">ដោនឡូត</p>
                </li>
                <li class="flex items-center hover:bg-tertiary" :class="$route.name == `Favorite`?`bg-tertiary`:``" @click="goTo('Favorite')">
                    <FavoriteIcon fill="#FFF"></FavoriteIcon>
                    <p class="ml-4">ចូលចិត្ត</p>
                </li>
                <li class="flex items-center hover:bg-tertiary" :class="$route.name == `Library`?`bg-tertiary`:``" @click="goTo('Library')">
                  <LibraryIcon fill="#FFF"></LibraryIcon>
                  <p class="ml-4">បណ្ណាល័យ</p>
                </li>
                <li class="flex items-center hover:bg-tertiary">
                    <CalendarIcon fill="#FFF"></CalendarIcon>
                    <p class="ml-4">កាលវិភាគសិក្សា</p>
                </li>
                <li class="flex items-center hover:bg-tertiary">
                    <SwitchIcon fill="#FFF"></SwitchIcon>
                    <p class="ml-4">ផ្លាស់ប្តូរគណនី</p>
                </li>
                <li class="flex items-center hover:bg-tertiary">
                    <HistoryIcon fill="#FFF"></HistoryIcon>
                    <p class="ml-4">ប្រវត្តិប្រើប្រាស់</p>
                </li>
                <li class="flex items-center hover:bg-tertiary" :class="$route.name == `Comment`?`bg-tertiary`:``" @click="goTo('Comment')">
                    <CommentIcon fill="#FFF"></CommentIcon>
                    <p class="ml-4">បញ្ចេញមតិ</p>
                </li>
                <li class="flex items-center hover:bg-tertiary" :class="$route.name == `About`?`bg-tertiary`:``" @click="goTo('About')">
                    <AboutIcon fill="#FFF"></AboutIcon>
                    <p class="ml-4">អំពីយើង</p>
                </li>
                <li class="flex items-center hover:bg-tertiary">
                    <ShareIcon fill="#FFF"></ShareIcon>
                    <p class="ml-4">ចែករំលែក</p>
                </li>
                <li class="flex items-center hover:bg-tertiary"  :class="$route.name == `Usage`?`bg-tertiary`:``" @click="goTo('Usage')">
                    <QuestionIcon fill="#FFF"></QuestionIcon>
                    <p class="ml-4">របៀបប្រើប្រាស់</p>
                </li>
                <li class="flex items-center hover:bg-tertiary" :class="$route.name == `Support`?`bg-tertiary`:``" @click="goTo('Support')">
                    <HeadPhoneIcon fill="#FFF"></HeadPhoneIcon>
                    <p class="ml-4">ជំនួយបន្ថែម</p>
                </li>
                <li class="flex items-center hover:bg-tertiary" @click="logoutUser">
                    <LogoutIcon fill="#FFF"></LogoutIcon>
                    <p class="ml-4">ចាកចេញ</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex"
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
import HomeIcon from "./../../components/HomeIcon.vue"
import helper from "./../../helper/index"
import LibraryIcon from '@/components/LibrayIcon'

export default {
    components:{
      LibraryIcon,
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
        LogoutIcon,
        HomeIcon

    },
    computed:{
        ...mapState('auth', ['auth']),
        ...mapState('layout', ['sidebarWidth'])
    },
    methods:{
        ...mapActions('auth', ['logout']),
        goTo(name){
            this.$router.push({name}).catch(()=>{})
        },
        logoutUser(){
            this.logout().then(()=>{
                localStorage.removeItem("auth")
                localStorage.removeItem("token")
                this.$store.commit('auth/getToken',null)
                this.$store.commit('auth/receivedAuth',{})
                this.$router.push({name:"SplashScreen"})
            }).catch(err=>{
                helper.error(err.response.data.message)
            })
        }
    }
}
</script>
<style>
    .menu li{
        padding:10px 15px;
        cursor: pointer;
    }
</style>
