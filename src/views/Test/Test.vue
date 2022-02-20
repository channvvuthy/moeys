<template>
  <div class="p-5 bg-forest h-full font-mono overflow-y-scroll">
    <!-- List -->
    <div v-if="loading" class="flex items-center justify-center" :style="{height:`${screenHeight}px`}">
      <LoadingIndicator></LoadingIndicator>
    </div>
    <div class="grid grid-cols-4 mt-5 gap-5" v-else>
      <div v-for="(subject, index) in subjects" :key="index"
           :style="{backgroundColor: `rgba(${hexToRgb(subject.subjectColor)},0.8)`}"
           class="rounded-md py-7 text-white">
        <div class="flex flex-col items-center justify-center cursor-pointer" @click="listChapter(subject)">
          <div :style="{backgroundColor: `${subject.subjectColor}`}"
               class="w-20 h-20 rounded-full flex items-center justify-center">
            <img :src="subject.subjectCover" style="max-width:30px;">
          </div>
          <div class="mt-5">
            {{ subject.subjectTitle }}
          </div>
        </div>
      </div>
    </div>
    <template v-if="isChapter">
      <Chapter :title="subjectTitle" @back="()=>{this.isChapter =false}"
               @selectedChapter="selectedChapter($event)"></Chapter>
    </template>
    <template v-if="isExam">
      <Exam @close="()=>{this.isExam = false}" @showResult="()=>{this.isResult = true; this.isExam =false}"></Exam>
    </template>
    <template v-if="isResult">
      <Result @close="()=>{this.isResult = false}"
              @checkResult="()=>{this.isResult = false, this.isCheck = true}"></Result>
    </template>
    <template v-if="isCheck">
      <Check @close="()=>{this.isCheck = false}"></Check>
    </template>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import Chapter from '@/views/Test/components/Chapter'
import Exam from '@/views/Test/components/Exam'
import Result from '@/views/Test/components/Result'
import Check from '@/views/Test/components/Check'

export default {
  components: {
    LoadingIndicator,
    Chapter,
    Exam,
    Result,
    Check
  },
  computed: {
    ...mapState('auth', ['token', 'auth']),
    ...mapState('test', ['loading', 'subjects', 'chapters']),
    refreshClass () {
      return this.$store.state.auth.refreshClass
    }
  },
  data () {
    return {
      screenHeight: null,
      isChapter: false,
      subjectTitle: '',
      pageSize: 50,
      isExam: false,
      isResult: false,
      isCheck: false
    }
  },
  methods: {
    ...mapActions('test', ['getMainSubject', 'getChapter', 'getTest']),
    hexToRgb (hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      if (result) {
        let r = parseInt(result[1], 16)
        let g = parseInt(result[2], 16)
        let b = parseInt(result[3], 16)
        return r + ',' + g + ',' + b//return 23,14,45 -> reformat if needed
      }
      return null
    },
    listChapter (subject) {
      this.subjectTitle = subject.subjectTitle
      let payload = {
        subject_id: subject.subjectId,
      }
      this.getChapter(payload).then(() => {
        this.isChapter = true
      })
    },
    handleResize () {
      this.screenHeight = window.innerHeight
      this.$store.commit('layout/setScreenHeight', this.screenHeight)
    },
    selectedChapter (lesson) {
      let payload = {
        lesson_id: lesson.lessonId,
        per_query: this.pageSize
      }
      this.getTest(payload).then(() => {
        this.isChapter = false
        this.isExam = true
      })
    },
    getList () {
      this.getMainSubject(
        {
          class_id: this.auth.user.classId,
          study_type: this.auth.user.typeId
        }
      )
    }
  },
  mounted () {
    this.handleResize()
    this.getList()
  },
  watch: {
    'refreshClass': function () {
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
