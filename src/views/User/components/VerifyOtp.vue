<template>
    <div class="fixed w-full h-full flex items-center justify-center flex-col z-50 py-10 font-mono">
        <div class="absolute left-2 top-4 cursor-pointer">
            <div class="flex items-center" @click="back">
                <BackIcon fill="#000"></BackIcon>
            </div>
        </div>
        <div class="absolute right-4 top-4 cursor-pointer">
            <div class="flex items-center text-sm" @click="()=>{this.$router.push({name:'Help'})}">
                ជំនួយ
            </div>
        </div>
        <template v-if="!isNewPassword">
            <div class="w-100">
                <img src="/assets/otp.svg" class="w-36 m-auto mb-5">
                <p class="mt-2 text-sm mb-5">លេខកូដផ្ទៀងផ្ទាត់</p>
                <p class="text-sm">សូមបំពេញលេខកូដ ៤ ខ្ទង់ដែលបានផ្ញើសារទៅកាន់ទូរស័ព្ទលេខ {{phone}}</p>
            </div>
            <div class="w-100 p-5">
                <input type="text" class="h-10 w-full rounded-full bg-transparent border border px-3 text-sm outline-none"
                placeholder="1234" ref="phone" v-model="otp" @keypress="isNumber($event)">
                <p class="text-xs mt-5">បើប្អូនមិនទទួលបានលេខកូដទេ ប្អូនអាចផ្ញើកូដសារជាថ្មីក្នុងរយៈពេល <span class="text-primary font-semibold">00:{{count}}</span></p>
                <button class="relative rounded-full bg-primary text-white w-full h-10 mt-5 flex items-center justify-center" @click="verify" :disabled="loading">
                    <div class="absolute -top-3" v-if="loading">
                        <LoaderIcon></LoaderIcon>
                    </div>
                    <div v-else>
                        យល់ព្រម
                    </div>
                </button>
            </div>
        </template>
        <template v-else>
            <div class="w-100">
                <p class="mt-2 text-2xl mb-5">បង្កើតពាក្យសម្ងាត់ថ្មី</p>
            </div>
            <div class="w-100 p-5">
                <div class="relative">
                    <input :type="isShowPassword?`text`:`password`" ref="password" 
                    v-model="password" class="h-10 w-full rounded-full bg-transparent border border px-3 text-sm outline-none" placeholder="ពាក្យសម្ងាត់ថ្មី 6 ខ្ទង់យ៉ាងតិច">
                    <div class="absolute right-4 top-2 cursor-pointer" @click="showPassword">
                        <EyeIcon fill="#000" v-if="!isShowPassword"></EyeIcon>
                        <InvisibleIcon fill="#000" v-else></InvisibleIcon>
                    </div>
                </div>
                <div class="h-5"></div>
                <div class="relative">
                    <input :type="isShowConfirmPassword?`text`:`password`" ref="confirmPassword" 
                    v-model="confirmPassword" class="h-10 w-full rounded-full bg-transparent border border px-3 text-sm outline-none" placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ថ្មី 6 ខ្ទង់យ៉ាងតិច">
                    <div class="absolute right-4 top-2 cursor-pointer" @click="showConfirmPassword">
                        <EyeIcon fill="#000" v-if="!isShowConfirmPassword"></EyeIcon>
                        <InvisibleIcon fill="#000" v-else></InvisibleIcon>
                    </div>
                </div>
                <button class="relative rounded-full bg-primary text-white w-full h-10 mt-5 flex items-center justify-center" @click="resetNewPassword">
                    <div class="absolute -top-3" v-if="loading">
                        <LoaderIcon></LoaderIcon>
                    </div>
                    <div v-else>
                        យល់ព្រម
                    </div>
                </button>
            </div>
        </template>
    </div>
</template>
<script>
import EyeIcon from "./../../../components/EyeIcon.vue"
import InvisibleIcon from "./../../../components/InvisibleIcon.vue"
import BackIcon from "./../../../components/BackIcon.vue"
import {mapActions} from "vuex"
import helper from "./../../../helper/index"
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
            otp: null,
            loading: false,
            password: null,
            confirmPassword: null,
            count: 60, 
            phone: null,
            isNewPassword: false,
            isShowPassword: false,
            isShowConfirmPassword: false
        }
    },
    methods:{
        ...mapActions('auth', ['sendOtp','verifyOtp','resetPassword']),
        isNumber(evt){
            return helper.isNumber(evt)
        },
        showPassword(){
            this.isShowPassword =! this.isShowPassword
        },
        showConfirmPassword(){
            this.isShowConfirmPassword =! this.isShowConfirmPassword
        },
        back(){
            this.$store.commit("auth/setVisibleForgotPassword", true)
            this.$router.go(-1)
        },
        coundDown(){
            let count = setInterval(()=>{
                this.count --
                if(this.count <=0){
                    clearInterval(count)
                    this.$store.commit("auth/setVisibleForgotPassword", true)
                    this.$router.go(-1)
                }
            },1000)
        },
        resetNewPassword(){
            if(!this.password){
                helper.error("សូមបញ្ចូលពាក្យសម្ងាត់")
                this.$refs.password.focus()
                return;
            }
            if(this.password.length < 6){
                helper.error("ពាក្យសម្ងាត់យ៉ាងតិច 6​ ខ្ទង់")
                this.$refs.password.focus()
                return;
            }
            if(!this.confirmPassword){
                helper.error("សូមបញ្ចូលពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់")
                this.$refs.confirmPassword.focus()
                return;
            }
            if(this.confirmPassword.length < 6){
                helper.error("ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់យ៉ាងតិច 6 ខ្ទង់")
                this.$refs.confirmPassword.focus()
                return;
            }
            if(this.password != this.confirmPassword){
                helper.error("ពាក្យសម្ងាត់ផ្ទៀផ្ទាត់មិនត្រឹមត្រូ")
                this.$refs.confirmPassword.focus()
                return;
            }
            this.loading = true
            let isZero = this.phone.charAt(0)
            if(isZero == 0){
                this.phone = `+855${this.phone.substring(1)}`
            }

            this.resetPassword({
                phone: this.phone,
                password: this.password
            }).then(() =>{
                this.loading = false
                this.$router.push({name: "Home"})
            }).catch(err=>{
                helper.error(err.response.data.message)
            })
        },
        verify(){
            this.verifyOtp({
                phone: this.$route.params.phone,
                code_otp: this.otp
            }).then(() =>{
                this.isNewPassword = true
            }).catch(err =>{
                helper.error(err.response.data.message)
            })
        },
        otpResetPassword(){
            
        },
    },

    mounted(){
        this.coundDown()
        this.phone = this.$route.params.phone.replace("+855", "0")
    }
}
</script>