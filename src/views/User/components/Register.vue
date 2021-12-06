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
        <div class="w-99 p-5">
            <p class="mb-5 text-xl">បង្កើតគណនីថ្មី</p>
            <input type="text" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
             placeholder="នាមត្រកូល">
            <div class="mb-5"></div>
            <input type="text" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
             placeholder="នាមខ្លួន">
            <div class="mb-5"></div>
            <div class="flex items-center">
                <label class="text-sm flex items-center mr-5">
                    <input type="radio" name="gender" class="hidden" v-model="gender" value="m">
                    <div class="h-4 w-4 border border-white rounded-full mr-2 flex items-center justify-center">
                        <div class="bg-white h-2 w-2 bg-white rounded-full" v-if="gender == 'm'"></div>
                    </div>
                    ប្រុស
                </label>
                <label class="text-sm flex items-center">
                    <input type="radio" name="gender" class="hidden" v-model="gender" value="f">
                    <div class="h-4 w-4 border border-white rounded-full mr-2 flex items-center justify-center">
                        <div class="bg-white h-2 w-2 bg-white rounded-full" v-if="gender == 'f'"></div>
                    </div>
                    ស្រី
                </label>
            </div>
            <div class="mb-5"></div>
            <div class="relative">
                 <input type="password" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none" placeholder="ពាក្យសម្ងាត់(6 ខ្ទង់យ៉ាងតិច)">
                <div class="absolute right-4 top-2 cursor-pointer">
                    <EyeIcon fill="#FFF"></EyeIcon>
                </div>
            </div>
            <div class="mb-5"></div>
            <div class="relative">
                 <input type="password" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none" placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់(6 ខ្ទង់យ៉ាងតិច)">
                <div class="absolute right-4 top-2 cursor-pointer">
                    <EyeIcon fill="#FFF"></EyeIcon>
                </div>
            </div>
            <div class="flex items-center text-xs mt-5 cursor-pointer">
                <div class="h-4 w-4 border border-white rounded-full mr-2 flex items-center justify-center">
                    <div class="bg-white h-2 w-2 bg-white rounded-full" v-if="gender == 'f'"></div>
                </div>
                <p>តើអ្នកយល់ព្រមជាមួយ <span class="text-secondary">លក្ខខ័ណ្ណ</span> នឹងការបង្កើតនិងប្រើប្រាស់គណនី?</p>
            </div>
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
    },
    data(){
        return{
            gender: "m"
        }
    }
}
</script>