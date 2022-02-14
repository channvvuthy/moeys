<template>
  <div class="fixed w-full h-full left-0 top-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div class="bg-white bg-white rounded-xl shadow relative w-100">
      <div class="h-12 flex items-center px-5 border-b">
        <div class="text-lg font-bold">
          កម្រងសំណួរ
        </div>
        <div
          @click="()=>{this.$emit('close')}"
          class="w-7 h-7 bg-forest rounded-full cursor-pointer flex items-center justify-center absolute -right-2 -top-4">
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div class="p-5">
        <div class="flex justify-between font-black">
          <div class="flex">
            <div class="mr-3">
              <ClockIcon></ClockIcon>
            </div>
            <div>
              <span>{{ min < 10 ? `0${min}` : min }}</span>
              <span>:&nbsp;</span>
              <span>{{ sec < 10 ? `0${sec}` : sec }}</span>
              <span> នាទី</span>
            </div>
          </div>
          <div>
            <span>
              {{ answer.length }}/{{ test.length }}
            </span>
          </div>
        </div>
        <div class="mt-5">
          <div v-for="(t, index) in test" :key="index">
            <div :class="index == currentQuestion?`show`:`hidden`">
              <div class="flex items-center overflow-x-scroll">
                <div>{{ enToKh(index + 1) }}.&nbsp;</div>
                <katex-element :expression="toLatex(t.testQuestion)"/>
              </div>
              <div v-for="(answer, key) in t.testAnswers" :key="key">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-4 hidden"
                         @change="selectAnswer($event,t,index,key,answer.answerStatus)">
                  <div class="h-5 w-5 rounded border mr-5 relative border border-gray-300"
                       :id="t.lessonId + '_' + index + '_' +key"></div>
                  <katex-element :expression="toLatex(answer.answerContents)"/>
                </label>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center mt-5 text-sm">
            <div class="flex items-center" :class="currentQuestion <= 0 ?`invisible`:`visible`" @click="backQuiz">
              <div class="mr-2 cursor-pointer">
                <div class="transform rotate-180">
                  <ChevronRigth :size="20"></ChevronRigth>
                </div>
              </div>
              <div class="cursor-pointer">
                សំណួរក្រោយ
              </div>
            </div>

            <div @click="nextQuiz" :class="currentQuestion >= (test.length - 1) ?`invisible`:`visible`">
              <div class="flex items-center">
                <div class="cursor-pointer">
                  សំណួរបន្ទាប់
                </div>
                <div class="ml-2 cursor-pointer">
                  <ChevronRigth :size="20"></ChevronRigth>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 flex items-center justify-center">
            <button class="text-white rounded-full px-20 py-2"
                    :class="(this.answer.length < this.test.length)?`bg-gray-300`:`bg-primary`"
                    :disabled="this.answer.length < this.test.length" @click="checkResult">ពិនិត្យលទ្ធផល
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import { mapState } from 'vuex'
import Vue from 'vue'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'
import ChevronRigth from '@/components/ChevronRigth'
import ClockIcon from '@/components/ClockIcon'

Vue.use(VueKatex, {
  globalOptions: {
    displayMode: true,
    strict: 'ignore',
    output: 'htmlAndMathml'
  }
})

export default {
  components: {
    ClockIcon,
    CloseIcon,
    ChevronRigth
  },
  computed: {
    ...mapState('test', ['test'])
  },
  data () {
    return {
      min: 0,
      sec: 0,
      currentQuestion: 0,
      answer: [],
      quiz: {
        total_query: '',
        correct_answers: '',
        incorrect_answers: '',
        duration: ''
      }
    }
  },
  methods: {
    selectAnswer (event, lesson, index, answer, answerStatus) {
      if (event.target.checked) {
        lesson.answer = answer
        lesson.index = index
        lesson.answerStatus = answerStatus
        this.answer = this.answer.filter(item => item.index != index)
        this.answer.push(lesson)
        event.target.nextSibling.className += ' active-checkbox'
        for (let i = 0; i < lesson.testAnswers.length; i++) {
          if (i != answer) {
            document.getElementById(`${lesson.lessonId}_${lesson.index}_${i}`).classList.remove('active-checkbox')
          }
        }
      } else {
        this.answer = this.answer.filter(item => item.index != index)
        event.target.nextSibling.classList.remove('active-checkbox')
      }
    },
    enToKh (str) {
      str = str.toString()
      return str.replace(/1/g, '១')
        .replace(/2/g, '២')
        .replace(/3/g, '៣')
        .replace(/4/g, '៤')
        .replace(/5/g, '៥')
        .replace(/6/g, '៦')
        .replace(/7/g, '៧')
        .replace(/8/g, '៨')
        .replace(/9/g, '៩')
        .replace(/0/g, '០')
    },
    toLatex (str) {
      str = str.toString()
      return str.replace(/\[math]/g, '').replace(/\[\/math]/g, '').replace(/&nbsp;/g, '').replace('។', '')
        .replace(/ℜ/g, '\\Re').replace(/\\left{/, '\\left\\{').replace(/\\right}/, '\\right\\}')
        .replace(/lorx/, 'lor x').replace(/intx/, 'int x').replace('timesf', 'times f')
        .replace(/{\\begin{matrix}/, '(\\begin{matrix}').replace(/\\end{matrix}\\right/g, '\\end{matrix}\\right)')
        .replace(/\\pitk/g, '{\\pi}tk').replace(/&ne;/g, '\\neq').replace(/&plusmn;/g, '\\pm')
        .replace(/&times;/, '\\times ').replace(/&alpha;/g, '\\alpha').replace(/&beta;/g, '\\beta')
        .replace(/&theta;/g, '\\theta').replace(/&divide;/g, '\\divide ').replace(/&pi;/g, '\\pi ')

    },
    nextQuiz () {
      if (this.currentQuestion < (this.test.length - 1)) {
        this.currentQuestion++
      }
    },
    backQuiz () {
      if (this.currentQuestion >= 1) {
        this.currentQuestion--
      }
    },
    checkResult () {
      this.quiz.total_query = this.test.length
      this.quiz.correct_answers = this.answer.filter(item => item.answerStatus == 1).length
      this.quiz.incorrect_answers = this.test.length - this.quiz.correct_answers
      this.quiz.duration = (parseInt(this.min) + 6000) + (parseInt(this.sec) + 1000)
      this.$store.commit('test/getResult', this.quiz)
      this.$store.commit("test/getAnwser", this.answer)
      this.$emit('showResult',)
    }
  },
  mounted () {
    this.quiz.total_query = this.test.length

    this.startingCount = setInterval(() => {
      this.sec++
      if (this.sec >= 59) {
        this.sec = 0
        this.min++
      }
    }, 1000)

  }
}
</script>

<style>
  input[type=checkbox] {
    /* Double-sized Checkboxes */
    -ms-transform: scale(1.5); /* IE */
    -moz-transform: scale(1.5); /* FF */
    -webkit-transform: scale(1.5); /* Safari and Chrome */
    -o-transform: scale(1.5); /* Opera */
    transform: scale(1.5);
    padding: 10px;
  }

  .active-checkbox::before {
    content: "✓";
    position: absolute;
    font-weight: bold;
    font-size: 25px;
    left: 0;
    bottom: -10px;
    margin-left: 2.5px;
  }
</style>
