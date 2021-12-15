<template>
    <div class="p-5 bg-forest font-mono">
        <div class="uppercase font-semibold text-primary flex items-center">
            <div>{{ $route.params.subject_title }}</div> 
            <div class="mx-2"><ChevronRigth :size="10"></ChevronRigth> </div>
            <div>{{ $route.params.chapter }}</div>
        </div>
        <div class="flex items-center justify-center h-full" v-if="loading" :style="{height:`${screenHeight}px`}">
            <LoadingIndicator></LoadingIndicator>
        </div>
        <div v-else class="overflow-y-scroll mt-5 pb-40" :style="{height:`${screenHeight}px`}">
            <div class="grid grid-cols-4 gap-5 ">
                <div v-for="(lesson, index) in lessons" :key="index" class="rounded-md bg-white shadow cursor-pointer overflow-hidden" @click="getVideo(lesson)">
                    <div class="relative font-normal">
                        <div class="absolute bg-primary text-xs w-7 h-7 top-2 left-2 bg-opacity-70 text-white flex items-center justify-center h-6 rounded">{{lesson.lessonIsSort}}</div>
                        <img :src="lesson.lessonThumbnail">
                        <div class="flex items-center justify-center px-3 py-1 bg-black bg-opacity-70 bottom-2 right-2 text-white absolute rounded text-xs">
                            {{ lesson.lessonDuration }}
                        </div>
                    </div>
                    <div class="px-2 pb-3">
                        <div class="text-xs text-primary my-2">ភាគទី{{lesson.lessonIsSort}}</div>
                        <div class="text-sm">{{lesson.lessonTitle}}</div>
                    </div>
                    <div class="w-full h-1" :style="{background:`${percentage(lesson.percentages)}`}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from "vuex"
import LoadingIndicator from "../../components/LoadingIndicator.vue"
import ChevronRigth from "../../components/ChevronRigth.vue"

export default {
    components:{
        LoadingIndicator,
        ChevronRigth
    },
    data(){
        return{
            loading: false
        }
    },
    computed:{
        ...mapState('course', ['lessons']),
        ...mapState('layout', ['screenHeight']),
    },
    methods:{
        ...mapActions('course', ['getLesson']),
        getVideo(lesson){
            this.$router.push({
                name: "Watch",
                params:{vidId:lesson.vId,lessonId:lesson.lessonId}
            })
        },
        percentage(percentage){
            return `linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(255, 255, 255) 0%)`
        }
    },
    created(){
        this.loading = true
        this.getLesson(this.$route.params.chapter_id).then(()=>{
            this.loading = false
        })
    }
}
</script>