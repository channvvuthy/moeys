<template>
    <div class="fixed z-50 w-full h-full top-0 left-0 bg-black bg-opacity-90 flex items-center justify-center">
         <div class="text-white" v-if="loading">
            <LoadingIndicator :bg="false"></LoadingIndicator>
        </div>
        <div v-else class="bg-white rounded-md shadow w-80 text-black text-sm">
            <div>
                <div class="text-base font-semibold w-full border-b h-12 flex items-center pl-5 justify-between">
                    <div class="cursor-pointer" @click="back">
                        <BackIcon></BackIcon>
                    </div>
                    <div class="text-center w-full">រាជធានី/ខេត្ត</div>
                </div>
                <ul class="px-5 max-h-96 overflow-y-scroll pb-5">
                    <li v-for="(province, index) in provinces" :key="index" class="py-2 cursor-pointer" @click="selectedProvince(province)">
                        {{ province.title }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from "vuex"
import LoadingIndicator from "./../../components/LoadingIndicator.vue"
import BackIcon from "./../../components/BackIcon.vue"
export default {
    components:{
        LoadingIndicator,
        BackIcon

    },
    computed:{
        ...mapState('helper', ['loading','provinces'])
    },
    methods:{
        ...mapActions('helper', ['getProvinces']),
        back(){
            this.$emit("back")
        },
        selectedProvince(province){
            this.$emit("selectedProvince",province)
        }
    },
    mounted(){
        this.getProvinces()
    }
}
</script>