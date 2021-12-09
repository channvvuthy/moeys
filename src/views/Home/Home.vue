<template>
  <div class="p-5 bg-forest h-full font-mono">
    <div class="uppercase font-semibold text-primary">សួស្តី {{auth.user.first_name}} {{auth.user.last_name}}!</div>
    <div>
      <div class="h-11 w-96 border border-gray-200 rounded-md px-3 bg-white mt-5 flex items-center justify-between cursor-pointer" @click="()=>{this.isClass = true}">
        <div>
          {{className?className:`ជ្រើរើសកម្រិតថ្នាក់`}}
        </div>
        <div>
          <ArrowDownIcon :size="22"></ArrowDownIcon>
        </div>
      </div>
      <!-- List -->
      <div v-if="loading" class="flex items-center justify-center" :style="{height:`${screenHeight}px`}">
        <LoadingIndicator></LoadingIndicator>
      </div>
      <div class="grid grid-cols-4 mt-5 gap-5" v-else>
          <div v-for="(subject, index) in subjects" :key="index" :style="{backgroundColor: `${subject.subjectColor}`}" class="rounded-md py-7 text-white">
            <div class="flex flex-col items-center justify-center cursor-pointer">
               <img :src="subject.subjectCover" style="max-width:50px;">
              <div class="mt-5">
                {{ subject.subjectTitle }}
              </div>
            </div>
          </div>
      </div>
    </div>
    <template v-if="isClass">
      <Class @selectedClass="selectedClass($event)" @back="closeClass"></Class>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

import ArrowDownIcon from "./../../components/ArrowDownIcon.vue"
import {mapState, mapActions} from "vuex"
import Class from "./../Helper/Class.vue"
import LoadingIndicator from "./../../components/LoadingIndicator.vue"
export default {
  name: 'Home',
  components: {
    ArrowDownIcon,
    Class,
    LoadingIndicator
  },
  data(){
    return{
      isClass: false,
      className: null,
      screenHeight: null,
    }
  },
  computed:{
    ...mapState('auth', ['token','auth']),
    ...mapState('course', ['loading', 'subjects'])
  },
  methods:{
    ...mapActions('course', ['getSubject']),
    closeClass(){
      this.isClass = false
    },
    selectedClass(cl){
      let class_id = cl.id
      this.getSubject({class_id})
      this.closeClass()
      this.className = cl.title
    },
    handleResize() {
        this.screenHeight = window.innerHeight;
    },
  },
  created(){
    if(!this.token){
      this.$router.push({name:"SplashScreen"});
    }
    this.handleResize();
    this.getSubject({class_id:12})

  }
}
</script>
