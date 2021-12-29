<template>
    <div class="fixed w-full h-full left-0 top-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
        <div class="w-56 bg-white rounded-md shadow text-sm">
            <ul>
                <li class="p-3 border-b flex justify-between items-center relative">
                    <div class="font-semibold">
                        ជ្រើសរើសកំរិត
                    </div>
                    <div class="cursor-pointer bg-forest rounded-full h-6 w-6 flex items-center justify-center absolute -top-3 -right-2 shadow" @click="closeQty">
                        <CloseIcon :width="20"></CloseIcon>
                    </div>
                </li>
                <li class="p-3 border-b cursor-pointer" @click="selectQuality(`360p`)">360</li>
                <li class="p-3 cursor-pointer" @click="selectQuality(`720p`)">720</li>
            </ul>
        </div>
    </div>
</template>
<script>
import CloseIcon from "./../../../components/CloseIcon.vue"
export default {
    components:{
        CloseIcon
    },
    methods:{
        selectQuality(qty){
            this.$emit("selectQuality",qty)
        },
        closeQty(){
            this.$emit("closeQty")
        }
    }
}
</script>