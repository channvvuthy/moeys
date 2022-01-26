<template>
    <div class="fixed w-full h-full flex items-center justify-center flex-col z-50 login py-10">
        <div class="absolute left-4 top-4 cursor-pointer">
            <div class="flex items-center" @click="() =>{this.$emit('back')}">
                <BackIcon fill="#FFF"></BackIcon>
            </div>
        </div>
        <div class="absolute right-4 top-4 cursor-pointer">
            <div class="flex items-center text-sm" @click="()=>{this.$router.push({name:'Help'})}">
                ជំនួយ
            </div>
        </div>
        <div class="text-center mb-20">
            <img src="/logo/Moeys.png" class="w-36">
            <p class="mt-2 text-sm">កម្មវិធី</p>
            <p class="font-bold text-2xl mt-2">ស្វ័យសិក្សា</p>
        </div>
        <div class="w-96 p-5">
            <p class="mb-5 text-xl">បំពេញព័ត៍មានគណនី</p>
            <input type="text" ref="phone" v-model="phone" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
             placeholder="លេខទូរស័ព្ទ (012345678)" @keypress="isNumber($event)">
            <div class="mb-5"></div>
            <div class="relative">
                 <input :type="isShowPassword?`text`:`password`" ref="password" v-model="password" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
             placeholder="ពាក្យសម្ងាត់">
            <div class="absolute right-4 top-2 cursor-pointer" @click="showPassword">
                <EyeIcon fill="#FFF" v-if="!isShowPassword"></EyeIcon>
                <InvisibleIcon fill="#FFF" v-else></InvisibleIcon>
            </div>
            <div class="text-right text-xs mt-5 cursor-pointer text-secondary" @click="() => this.$emit('forgotPassword')">
                ភ្លេចពាក្យសម្ងាត់?
            </div>
            <button class="relative rounded-full bg-white text-primary w-full h-10 mt-5 flex items-center justify-center" @click="userLogin" :disabled="loading">
                <div class="absolute -top-3" v-if="loading">
                    <LoaderIcon></LoaderIcon>
                </div>
                <div v-else>ចូល</div>
            </button>
            <div class="mt-5 text-xs text-right">
                <p>មិនទាន់មានគណនី? <span class="cursor-pointer font-bold text-secondary" @click="() =>{this.$emit('register')}">បង្កើតថ្មី</span></p>
            </div>

             </div>
        </div>
    </div>
</template>
<script>
import EyeIcon from "./../../../components/EyeIcon.vue"
import InvisibleIcon from "./../../../components/InvisibleIcon.vue"
import BackIcon from "./../../../components/BackIcon.vue"
import helper from "./../../../helper/index"
import {mapState, mapActions} from "vuex"
import LoaderIcon from "./../../../components/LoaderIcon.vue"
export default {
    components:{
        EyeIcon,
        BackIcon,
        LoaderIcon,
        InvisibleIcon
    },
    data(){
        return{
            phone: null,
            password: null,
            isShowPassword: false

        }
    },
    computed:{
        ...mapState('auth', ['auth','loading','token'])
    },
    created(){
        if(this.token){
            this.$router.push({name: "Home"})
        }
    },
    methods:{
        ...mapActions('auth', ['login']),
        isNumber(evt){
            return helper.isNumber(evt)
        },
        showPassword(){
            this.isShowPassword =! this.isShowPassword
        },
        userLogin(){
            if(!this.phone){
                helper.error("សូមបញ្ចូលលេខទូរស័ព្ទ")
                this.$refs.phone.focus()
                return;
            }
            if(!this.password){
                helper.error("សូមបញ្ចូលពាក្យសម្ងាត់")
                this.$refs.password.focus()
                return;
            }
            let isZero = this.phone.charAt(0)
            let phoneWithCountryCode = this.phone
            if(isZero == 0){
                phoneWithCountryCode = `+855${this.phone.substring(1)}`

            }
            this.login({
                phone: phoneWithCountryCode,
                password: this.password
            }).then(res =>{
                this.$store.commit("auth/getToken",res.access_token)
                this.$store.commit("auth/receivedAuth",res)

                localStorage.setItem("token",res.access_token)
                localStorage.setItem("auth", JSON.stringify(res))

                this.$router.push({name: "Home"})
            }).catch(err =>{
                helper.error(err.response.data.message)
            });
        }
    }
}
</script>
