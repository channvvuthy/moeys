<template>
  <div class="fixed w-full h-full left-0 top-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div class="bg-white bg-white rounded-xl shadow relative w-100">
      <div class="h-12 flex items-center px-5 border-b">
        <div class="text-lg font-bold">
          ផ្ទៀងផ្ទាត់ចំលើយ
        </div>
        <div
          @click="()=>{this.$emit('close')}"
          class="w-7 h-7 bg-forest rounded-full cursor-pointer flex items-center justify-center absolute -right-2 -top-4">
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div class="p-5">
        <div class="mt-5">
          <div class="h-5/6 overflow-y-scroll" style="max-height: 500px;">
            <div v-for="(t, index) in answer" :key="index">
              <div>
                <div class="flex items-center overflow-x-scroll">
                  <div>{{ enToKh(index + 1) }}.&nbsp;</div>
                  <katex-element :expression="toLatex(t.testQuestion)"/>
                </div>
                <div v-for="(answer, key) in t.testAnswers" :key="key">
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-4 hidden">
                    <div class="h-5 w-5 rounded border mr-5 relative border border-gray-300 active-checkbox" v-if="answer.answerStatus == 1">
                      <div class="h-5 w-5"></div>
                    </div>
                    <div class="h-5 w-5 rounded border mr-5 relative border border-gray-300 flex items-center justify-center" v-else>
                      <div class="h-5 w-5 flex items-center justify-center ">
                        <div v-if="t.answer == key">
                          <CloseIcon fill="#ef4444"></CloseIcon>
                        </div>
                      </div>

                    </div>
                    <katex-element :expression="toLatex(answer.answerContents)"/>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 flex items-center justify-center">
            <button class="text-white rounded-full px-20 py-2 bg-primary" @click="()=>{this.$emit('close')}">
              រួចរាល់
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

Vue.use(VueKatex, {
  globalOptions: {
    displayMode: true,
    strict: 'ignore',
    output: 'htmlAndMathml'
  }
})

export default {
  components: {
    CloseIcon,
  },
  computed: {
    ...mapState('test', ['test','answer'])
  },
  data () {
    return {
    }
  },
  methods: {
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

    }
  },
  mounted () {
    console.log(this.answer)
  }
}
</script>

<style scoped>
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
