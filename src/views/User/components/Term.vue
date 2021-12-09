<template>
    <div class="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50">
        <div class="text-white" v-if="loading">
            <LoadingIndicator :bg="false"></LoadingIndicator>
        </div>
        <div v-else class="bg-white rounded-md shadow w-2/5 h-90 overflow-y-scroll text-black text-sm">
            <div>
                <div class="text-lg font-semibold w-full border-b h-12 flex items-center pl-5 justify-between">
                    <div class="cursor-pointer" @click="back">
                        <BackIcon></BackIcon>
                    </div>
                    <div class="text-center w-full">លក្ខខ័ណ្ណ</div>
                </div>
                <div v-html="term.content" class="p-5"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from "vuex"
import LoadingIndicator from "./../../../components/LoadingIndicator.vue"
import BackIcon from "./../../../components/BackIcon.vue"
export default {
    components:{
        LoadingIndicator,
        BackIcon
    },
    computed:{
        ...mapState('term', ['loading','term'])
    },
    methods:{
        ...mapActions('term', ['getTerm']),
        back(){
            this.$emit("back")
        }
    },
    mounted(){
        this.getTerm()
    }
}
</script>