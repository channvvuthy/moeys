<template>
    <div class="fixed w-full h-full flex items-center justify-between flex-col z-50 login py-10">
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
        <div>
            <img src="/logo/Moeys.png" class="w-36">
            <p class="mt-2 text-sm">កម្មវិធី</p>
            <p class="font-bold text-2xl mt-2">ស្វ័យសិក្សា</p>
        </div>
        <div class="w-96 p-5">
            <p class="mb-5 text-xl">បំពេញព័ត៍មានគណនី</p>
            <input type="text" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
             placeholder="លេខទូរស័ព្ទ">
            <div class="mb-5"></div>
            <div class="relative">
                 <input type="password" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
             placeholder="ពាក្យសម្ងាត់">
            <div class="absolute right-4 top-2 cursor-pointer">
                <EyeIcon fill="#FFF"></EyeIcon>
            </div>
            <div class="text-right text-xs mt-5 cursor-pointer text-secondary" @click="() => this.$emit('forgotPassword')">
                ភ្លេចពាក្យសម្ងាត់?
            </div>
            <button class="border rounded-full bg-white text-primary w-full h-10 mt-5">
                ចូល
            </button>
            <div class="mt-5 text-xs">
                <p>មិនទាន់មានគណនី? <span class="cursor-pointer font-bold text-secondary" @click="() =>{this.$emit('register')}">បង្កើតថ្មី</span></p>
            </div>

             </div>
        </div>
    </div>
</template>
<script>
import EyeIcon from "./../../../components/EyeIcon.vue"
import BackIcon from "./../../../components/BackIcon.vue"
export default {
    components:{
        EyeIcon,
        BackIcon
    }
}
</script>