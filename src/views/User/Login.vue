<template>
    <div class="login flex flex-col justify-center items-center h-screen text-white font-mono">
        <div class="text-center">
            <img src="/logo/Moeys.png" class="w-36">
            <p class="mt-2 text-sm">កម្មវិធី</p>
            <p class="font-bold text-2xl mt-2">ស្វ័យសិក្សា</p>
        </div>
        <div class="flex mt-10 text-sm">
            <button class="w-40 text-center border rounded-full h-10 hover:bg-white hover:text-primary" @click="()=>{this.isInstruction = true}">ទស្សនកិច្ចកម្មវិធី</button>
            <button class="w-40 text-center border rounded-full h-10 mx-5 hover:bg-white hover:text-primary" @click="()=>{this.isLogin = true}">ចូលកម្មវិធី</button>
            <button class="w-40 text-center border rounded-full h-10 hover:bg-white hover:text-primary" @click="() =>{this.isRegister = true}">គណនីថ្មី</button>
        </div>
        <template v-if="isLogin">
            <Login @back="back" @register="register" @forgotPassword="forgotPassword"></Login>
        </template>
        <template v-if="isRegister">
            <Register @back="back"></Register>
        </template>
        <template v-if="isForgotPassword">
            <ForgotPassword @back="back"></ForgotPassword>
        </template>
         <template v-if="isInstruction">
            <Instruction @back="back"></Instruction>
        </template>
        
    </div>
</template>
<script>
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import ForgotPassword from "./components/ForgotPassword.vue"
import Instruction from "./components/Instruction.vue"
import {mapState} from "vuex"

export default {
    components:{
        Login,
        Register,
        ForgotPassword,
        Instruction
    },
    data(){
        return{
            isLogin: false,
            isRegister: false,
            isInstruction: false
        }
    },
    computed:{
        ...mapState('auth', ['isForgotPassword','token'])
    },
    created(){
        if(this.token){
            this.$router.push({name: "Home"})
        }
    },
    methods:{
        back(){
            this.isLogin = false
            this.isRegister = false
            this.$store.commit("auth/setVisibleForgotPassword", false)
            this.isInstruction = false
        },
        register(){
            this.back()
            this.isRegister = true
        },
        forgotPassword(){
            this.$store.commit("auth/setVisibleForgotPassword", true)
        }
    }
}
</script>
<style>
    .login{
        background-image: url("/assets/bg-login.jpg");
        background-size: cover;
        background-position: center center;
        
    }
</style>