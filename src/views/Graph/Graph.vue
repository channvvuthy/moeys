<template>
  <div class="bg-white h-full">
    <div class="flex items-center shadow bg-white p-3 overflow-x-scroll w-full">
      <div class="w-40 text-center relative" @click="showAll">
        <div class="h-16 w-16 rounded-full flex items-center justify-center cursor-pointer m-auto bg-primary">
          <img src="/assets/book.svg" class="w-9">
        </div>
        <div class="text-center text-sm mt-3 font-semibold">
          ទាំងអស់
        </div>
        <div class="border-b-4 border-primary absolute bottom-0 left-0 w-full -bottom-3" v-if="filter == `all`"></div>
      </div>
      <div v-for="(gr, index) in graph" :key="index" class="w-56 text-center relative" @click="filterGraph(gr)">
        <div class="h-16 w-16 rounded-full flex items-center justify-center cursor-pointer m-auto"
             :style="{backgroundColor:`${gr.color}`}">
          <img :src="gr.icon" class="w-8">
        </div>
        <div class="text-center text-sm mt-3 font-semibold whitespace-nowrap">
          {{ gr.title }}
        </div>
        <div class="border-b-4 border-primary absolute bottom-0 left-0 w-full -bottom-3" v-if="filter == gr.id"></div>
      </div>
    </div>
    <div>
      <div v-if="filter == `all`" class="flex justify-between">
        <div class="w-1/2 my-10">
          <div class="text-xl text-center mb-5 text-primary font-bold">គ្រប់មុខវិជ្ជាទាំងអស់</div>
          <div v-if="loading" class="flex items-center justify-center h-full">
            <div class="relative -top-20">
              <LoadingIndicator></LoadingIndicator>
            </div>
          </div>
          <div class="overflow-scroll custom-scroll pl-5" style="max-height: 40rem;">
            <div class="h-screen">
              <template v-if="total == 0">
                <div class="flex items-center justify-center py-24">
                  <empty></empty>
                </div>
              </template>
              <div :class="total?``:`invisible`" class="w-100 m-auto">
                <doughnutOutlabelGraph></doughnutOutlabelGraph>
              </div>
            </div>
          </div>
        </div>
        <div class="h-screen border">
        </div>
        <div class="my-10 w-1/2 px-5 overflow-y-scroll custom-scroll">
          <div class="text-xl text-center mb-5 text-primary font-bold">
            សរុបម៉ោងប្រើប្រាស់ទាំងអស់ប្រចាំខែ
          </div>
          <div class="flex px-4 relative">
            <div
              class="relative z-40 border h-10 rounded-md text-primary w-56 flex items-center px-3 justify-between cursor-pointer"
              @click="()=>{this.isCalendar = !this.isCalendar}">
              <div class="flex items-center">
                <span>ខែ {{ getMonth(currentMonth) }}</span>
                <div class="mx-1"></div>
                <span>ឆ្នាំ {{ currentYear }}</span>
              </div>
              <div>
                <CalendarIcon fill="#174B7C"></CalendarIcon>
              </div>
            </div>
            <!-- LIST ALL MONTH  -->
            <div class="absolute z-50 mt-3" v-if="isCalendar">
              <div class="shadow rounded h-56 overflow-y-scroll mt-12 border">
                <div class="transform rotate-180 absolute ml-3 top-7 bg-white">
                  <ArrowIcon></ArrowIcon>
                </div>
                <div v-for="(item, index) in 12"
                     @click="filterGraphByIndex(index)"
                     :key="index"
                     class="border-b px-3 py-1 text-sm bg-white flex items-center jutify-between cursor-pointer text-primary">
                  <div class="w-14">
                    {{ getMonth(index) }}
                  </div>
                  <div>
                    {{ currentYear }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div v-if="loadingArea" class="flex items-center justify-center h-screen">
              <div class="relative -top-14">
                <LoadingIndicator></LoadingIndicator>
              </div>
            </div>
            <div v-else>
              <apexchart type="area" :options="chartOptions" :series="series"></apexchart>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="loadingFilter" class="flex items-center justify-center h-screen w-full">
          <div class="relative -top-20">
            <LoadingIndicator></LoadingIndicator>
          </div>
        </div>
        <div v-else class="flex h-full p-5">
          <div class="w-1/2">
            <div class="text-xl font-bold text-primary text-center">លទ្ធផលសិក្សារបស់ខ្ញុំ</div>
            <div class="grid grid-cols-2 gap-5 mt-5">
              <div class="flex-wrapper">
                <div class="single-chart">
                  <svg viewBox="0 0 36 36" class="circular-chart blue">
                    <path class="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path class="circle"
                          :stroke-dasharray="`${Math.floor(subject.main.totalLearn)},100`"
                          :stroke="Math.floor(subject.main.totalLearn)?color:`transparent`"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" class="percentage">
                      {{ subject.main.totalLearn == null ? 0 : parseFloat(subject.main.totalLearn.toFixed(2)) }}%
                    </text>
                  </svg>
                  <div class="text-primary text-center text-lg">ការសិក្សា</div>
                </div>
              </div>
              <div class="flex-wrapper">
                <div class="single-chart">
                  <svg viewBox="0 0 36 36" class="circular-chart blue">
                    <path class="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path class="circle"
                          :stroke-dasharray="`${Math.floor(subject.main.totalTest)},100`"
                          :stroke="Math.floor(subject.main.totalTest)?color:`transparent`"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" class="percentage">
                      {{ Math.floor(subject.main.totalTest) }}%
                    </text>
                  </svg>
                  <div class="text-primary text-center text-lg">លទ្ធផលតេស្ត</div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-1/2">
            <div class="text-xl font-bold text-primary text-center text-center">
              ក្រាបសិក្សារមុខវិជ្ជា{{ course }}
            </div>
            <div class="overflow-y-scroll mt-5 h-screen custom-scroll">
              <div v-for="(data, index) in subject.data" :key="index" @click="showLesson(data.chapterId)">
                <div class="bg-forest mb-2 px-5 py-3 rounded flex items-center justify-between cursor-pointer">
                  <div>
                    {{ data.title }}
                  </div>
                  <div class="transform rotate-90">
                    <ChevronRigth fill="#000" :size="18"></ChevronRigth>
                  </div>
                </div>
                <div v-if="selectedChapter == data.chapterId">
                  <div v-for="(lesson, key) in data.lessons" :key="key"
                       class="bg-white border-b-2 py-3 px-5 border-dashed mb-1">
                    <div class="grid grid-cols-2 gap-10">
                      <div>
                        <div class="text-primary font-black">មេរៀន</div>
                        <div class="my-2">{{ lesson.title }}</div>
                        <div class="flex items-center">
                          <div class="h-2 w-full bg-forest">
                            <div class="h-2 bg-primary"
                                 :style="{width:`${lesson.percentages == null?0:lesson.percentages}%`}"></div>
                          </div>
                          <div class="ml-2">
                            {{ lesson.percentages == null ? 0 : lesson.percentages }}%
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="text-primary font-black">លទ្ធផលតេស្ត</div>
                        <div class="my-2">&nbsp;</div>
                        <div class="flex items-center">
                          <div class="text-primary ">ពិន្ទុ</div>
                          <div class="ml-3">{{ lesson.correctAnswer }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="h-64"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import doughnutOutlabelGraph from '@/views/Graph/doughnut-outlabel-graph'
import LoadingIndicator from '@/components/LoadingIndicator'
import LineGraph from '@/views/Graph/LineGraph'
import VueApexCharts from 'vue-apexcharts'
import Vue from 'vue'
import ChevronRigth from '@/components/ChevronRigth'
import Empty from './../../components/Empty.vue'
import helper from '@/helper'
import CalendarIcon from '@/components/CalendarIcon'
import ArrowIcon from '@/components/ArrowIcon'

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

export default {
  components: {
    doughnutOutlabelGraph,
    LineGraph,
    LoadingIndicator,
    ChevronRigth,
    Empty,
    CalendarIcon,
    ArrowIcon
  },
  computed: {
    ...mapState('graph', ['graph', 'usage', 'loading', 'subject'])
  },
  data () {
    return {
      isCalendar: false,
      total: 0,
      filterType: false,
      currentMonth: '',
      currentYear: '',
      currentDate: 0,
      isChatHasValue: 0,
      loadingArea: false,
      loadingFilter: false,
      selectedChapter: '',
      color: '',
      course: '',
      month: 0,
      filter: 'all',

      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Graph',
            backgroundColor: [],
            data: [],
            hoverOffset: 2
          }
        ]
      },
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'នាទី',
        data: []
      }]
    }
  },
  methods: {
    ...mapActions('graph', ['getGraph', 'getUsage', 'getBySubject']),
    getFirstDayOfWeek (d) {
      const date = new Date(d)
      const day = date.getDay()
      const diff = date.getDate() - day

      return new Date(date.setDate(diff))
    },
    showAll () {
      this.$router.push({
        name: 'refreshGraph'
      })
    },
    getMonth (month) {
      return helper.getMonth(month)
    },
    showLesson (chapterId) {
      if (this.selectedChapter == chapterId) {
        this.selectedChapter = ''
        return
      }
      this.selectedChapter = chapterId
    },
    filterGraphByIndex (filter) {
      this.currentMonth = filter
      this.isCalendar = false
      this.showReport()
    },

    filterGraph (filter) {
      this.filter = filter.id
      this.loadingFilter = true
      this.getBySubject(filter.id).then(() => {
        this.loadingFilter = false
        this.color = filter.color
        this.course = filter.title
      })
    },
    millisToMinutesAndSeconds (millis) {
      return Math.floor(millis / 60000)
    },
    showDonut () {
      this.chartData.labels = []
      this.chartData.datasets[0].data = []
      this.chartData.datasets[0].backgroundColor = []

      this.getGraph().then(() => {
        for (let i = 0; i < this.graph.length; i++) {
          this.chartData.labels.push(this.graph[i].title)
          let totalPercentage = (Math.round(this.graph[i].totalPercentage * 100) / 100).toFixed(1)
          this.total = this.total + parseFloat(totalPercentage)
          this.chartData.datasets[0].data.push(totalPercentage)
          this.chartData.datasets[0].backgroundColor.push(this.graph[i].color)
        }
        this.$store.commit('graph/renderGraph', this.chartData)

      })
    },
    showReport () {
      this.month = this.currentMonth + 1
      this.loadingArea = true
      this.chartOptions.xaxis.categories = []
      this.series[0].data = []
      this.getUsage(this.month).then(() => {
        for (let i = 0; i < this.usage.length; i++) {
          this.chartOptions.xaxis.categories.push(this.usage[i].day + ` ${this.getMonth(this.currentMonth)}`)
          this.series[0].data.push(this.millisToMinutesAndSeconds(this.usage[i].duration))
        }
        this.loadingArea = false
      })
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
  },
  mounted () {
    this.showReport()
    this.showDonut()
  },
  created () {
    let date = this.getFirstDayOfWeek(new Date())
    this.currentDate = date.getDate()
    this.currentMonth = date.getUTCMonth() + 1
    this.currentYear = this.enToKh(date.getFullYear())

  }
}
</script>

<style scoped>
.single-chart {
  width: 100%;
  justify-content: space-around;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 250px;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.percentage {
  fill: #666;
  font-size: 0.5em;
  text-anchor: middle;
}
</style>
