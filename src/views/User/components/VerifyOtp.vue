<template>
    <div class="fixed w-full h-full flex items-center justify-between flex-col z-50 py-10 font-mono">
        <div class="absolute left-2 top-4 cursor-pointer">
            <div class="flex items-center" @click="() =>{this.$emit('back')}">
                <BackIcon fill="#000"></BackIcon>
            </div>
        </div>
        <div class="absolute right-4 top-4 cursor-pointer">
            <div class="flex items-center text-sm" @click="()=>{this.$router.push({name:'Help'})}">
                ជំនួយ
            </div>
        </div>
         <div>
            <img src="/logo/Moeys.png" class="w-36">
            <p class="mt-2 text-sm">កម្មវិធី</p>
            <p class="font-bold text-2xl mt-2">ស្វ័យសិក្សា</p>
        </div>
        <div class="w-96 p-5">
            <p class="mb-5 text-xl">ភ្លេចពាក្យសម្ងាត់</p>
            <p class="text-base mb-5">បញ្ចូលលេខទូរស័ព្ទរបស់អ្នកដើម្បីបង្កើតពាក្យសម្ងាត់ថ្មី</p>
            <input type="text" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
             placeholder="លេខទូរស័ព្ទ (012345678)" ref="phone" v-model="phone" @keypress="isNumber($event)">
            <button class="relative rounded-full bg-white text-primary w-full h-10 mt-5 flex items-center justify-center" @click="otpResetPassword" :disabled="loading">
                <div class="absolute -top-3" v-if="loading">
                    <LoaderIcon></LoaderIcon>
                </div>
                <div v-else>
                    យល់ព្រម
                </div>
            </button>
        </div>
    </div>
</template>
<script>
import EyeIcon from "./../../../components/EyeIcon.vue"
import BackIcon from "./../../../components/BackIcon.vue"
import {mapActions} from "vuex"
import helper from "./../../../helper/index"
import LoaderIcon from "./../../../components/LoaderIcon.vue"
export default {
    components:{
        EyeIcon,
        BackIcon,
        LoaderIcon
    },
    data(){
        return{
            phone: null,
            loading: false
        }
    },
    methods:{
        ...mapActions('auth', ['sendOtp']),
        isNumber(evt){
            return helper.isNumber(evt)
        },
        otpResetPassword(){
            if(!this.phone){
                helper.error("សូមបញ្ចូលលេខទូរស័ព្ទ")
                this.$refs.phone.focus()
                return;
            }
            let isZero = this.phone.charAt(0)
            if(isZero == 0){
                this.phone = `+855${this.phone.substring(1)}`
            }
            this.loading = true
            this.sendOtp({
                phone: this.phone
            }).catch(err =>{
                helper.error(err.response.data.message)
                this.loading = false
            }).then(res =>{
                this.loading = false
                this.$router.push({
                    name: "VerifyOtp"
                })
            })
        },
    }
}
</script>