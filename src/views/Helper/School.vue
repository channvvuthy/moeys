<template>
    <div class="fixed z-50 w-full h-full top-0 left-0 bg-black bg-opacity-90 flex items-center justify-center">
         <div class="text-white" v-if="loadingSchool">
            <LoadingIndicator :bg="false"></LoadingIndicator>
        </div>
        <div v-else class="bg-white rounded-md shadow w-80 text-black text-sm">
            <div>
                <div class="text-base font-semibold w-full border-b h-12 flex items-center pl-5 justify-between">
                    <div class="cursor-pointer" @click="back">
                        <BackIcon></BackIcon>
                    </div>
                    <div class="text-center w-full">សាលា</div>
                </div>
                <ul class="px-5 max-h-96 overflow-y-scroll pb-5">
                    <li v-for="(school, index) in schools" :key="index" class="py-2 cursor-pointer" @click="selectedSchool(school)">
                        {{ school.school_name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from "vuex"
import LoadingIndicator from "../../components/LoadingIndicator.vue"
import BackIcon from "../../components/BackIcon.vue"
export default {
    props:{
        province_id:{
            default:()=>{
                return 1
            }
        }
    },
    components:{
        LoadingIndicator,
        BackIcon
    },
    computed:{
        ...mapState('helper', ['loadingSchool','schools'])
    },
    methods:{
        ...mapActions('helper', ['getSchools']),
        back(){
            this.$emit("back")
        },
        selectedSchool(school){
            this.$emit("selectedSchool",school)
        }
    },
    mounted(){
        this.getSchools(this.province_id)
    }
}
</script>