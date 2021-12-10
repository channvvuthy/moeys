<template>
  <div class="p-5 bg-forest h-full font-mono">
    <div class="uppercase font-semibold text-primary">សួស្តី {{auth.user.first_name}} {{auth.user.last_name}}!</div>
    <div>
      <div class="h-11 w-96 border border-gray-200 rounded-md px-3 bg-white mt-5 flex items-center justify-between cursor-pointer" @click="()=>{this.isClass = true}">
        <div>
          {{className?className:auth.user.class?auth.user.class:`ជ្រើរើសកម្រិតថ្នាក់`}}
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
            <div class="flex flex-col items-center justify-center cursor-pointer" @click="listChapter(subject)">
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
    <template v-if="isChapter">
      <Chapter :subject_id="subject_id" :class_id="class_id" :title="title" @back="()=>{this.isChapter = false}" @selectedChapter="selectedChapter($event)"></Chapter>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

import ArrowDownIcon from "./../../components/ArrowDownIcon.vue"
import {mapState, mapActions} from "vuex"
import Class from "./../Helper/Class.vue"
import LoadingIndicator from "./../../components/LoadingIndicator.vue"
import Chapter from "./components/Chapter.vue"
export default {
  name: 'Home',
  components: {
    ArrowDownIcon,
    Class,
    LoadingIndicator,
    Chapter
  },
  data(){
    return{
      isClass: false,
      className: null,
      screenHeight: null,
      isChapter: false,
      subject_id: null,
      subject: {},
      class_id: 12,
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
    listChapter(subject){
      this.subject_id = subject.subjectId
      this.subject_title =  subject.subjectTitle
      this.title = subject.subjectTitle
      this.isChapter = true
    },
    selectedClass(cl){
      let class_id = cl.id
      this.auth.user.class = cl.title
      this.auth.user.classId = class_id
      localStorage.setItem("auth",JSON.stringify(this.auth)) 
      this.class_id = class_id
      this.getSubject({class_id})
      this.closeClass()
      this.className = cl.title
    },
    handleResize() {
        this.screenHeight = window.innerHeight;
        this.$store.commit("layout/setScreenHeight",this.screenHeight)
    },
    selectedChapter(chapter){
      this.$router.push({
        name: "Lesson",
        params:{
          subject_title: this.subject_title,
          chapter_id: chapter.chapterId,
          chapter: chapter.chapterTitle
        }
      })
    }
  },
  created(){
    if(!this.token){
      this.$router.push({name:"SplashScreen"});
    }
    this.handleResize();
    this.getSubject({class_id:this.auth.user.classId})
  }
}
</script>
