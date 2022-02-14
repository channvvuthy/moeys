<template>
  <div class="fixed z-50 w-full h-full top-0 left-0 bg-black bg-opacity-90 flex items-center justify-center">
    <div class="text-white" v-if="loading">
      <LoadingIndicator :bg="false"></LoadingIndicator>
    </div>
    <div v-else class="bg-white rounded-md shadow w-96 text-black text-sm">
      <div>
        <div class="text-base font-semibold w-full border-b h-12 flex items-center pl-5 justify-between">
          <div class="cursor-pointer" @click="back">
            <BackIcon></BackIcon>
          </div>
          <div class="text-center w-full">{{title}}</div>
        </div>
        <ul class="px-5 max-h-96 overflow-y-scroll pb-5">
          <li v-for="(chapter, index) in chapters" :key="index" class="py-3">
            <div class="font-bold border-b text-base py-3 text-center">
              {{chapter.title}}
            </div>
            <div v-for="(lession, key) in chapter.lesson" class="mb-4" @click="selectedChapter(lession)">
              <div class="flex items-center bg-forest rounded-md px-3 py-2 cursor-pointer">
                <div :style="{backgroundColor:`${lession.color}`}" class="h-10 w-10 rounded-full flex items-center justify-center">
                  <img :src="lession.icon" class="w-4">
                </div>
                <div class="ml-5">{{ lession.title }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex"
import LoadingIndicator from "../../../components/LoadingIndicator.vue"
import BackIcon from "../../../components/BackIcon.vue"
export default {
  props:{
    title:{
      default:()=>{
        return ""
      }
    }
  },
  components:{
    LoadingIndicator,
    BackIcon
  },
  data(){
    return{
      loading: false
    }
  },
  computed:{
    ...mapState('test', ['chapters'])
  },
  methods:{
    back(){
      this.$emit("back")
    },
    selectedChapter(chapter){
      this.$emit("selectedChapter",chapter)
    }
  },
}
</script>
