<template>
    <div class="fixed w-full h-full flex items-center justify-between flex-col z-50 login py-10">
        <div class="absolute left-2 top-4 cursor-pointer">
            <div class="flex items-center" @click="() =>{this.$emit('back')}">
                <BackIcon fill="#FFF"></BackIcon>
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
             placeholder="លេខទូរស័ព្ទ">
            <button class="border rounded-full bg-white text-primary w-full h-10 mt-5">
                យល់ព្រម
            </button>
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