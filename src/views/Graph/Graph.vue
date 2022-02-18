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
        <div class="w-1/2 my-5">
          <div class="text-xl text-center mb-5 text-primary font-bold">គ្រប់មុខវិជ្ជាទាំងអស់</div>
          <div v-if="loading" class="flex items-center justify-center h-full">
            <div class="relative -top-20">
              <LoadingIndicator></LoadingIndicator>
            </div>
          </div>
          <template>
            <doughnutOutlabelGraph :chart-data="chartData"></doughnutOutlabelGraph>
          </template>

        </div>
        <div class="h-screen border">
        </div>
        <div class="my-5 w-1/2 px-5 overflow-y-scroll">
          <div class="text-xl text-center mb-5 text-primary font-bold">
            សរុបម៉ោងប្រើប្រាស់ទាំងអស់
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
                      {{ Math.floor(subject.main.totalLearn) }}%
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
            <div class="overflow-y-scroll mt-5 h-screen">
              <div v-for="(data, index) in subject.data" :key="index" @click="showLesson(data.chapterId)">
                <div class="bg-forest mb-2 px-5 py-3 rounded-md flex items-center justify-between cursor-pointer">
                  <div>
                    {{ data.title }}
                  </div>
                  <div class="transform rotate-90">
                    <ChevronRigth fill="#000"></ChevronRigth>
                  </div>
                </div>
                <div v-if="selectedChapter == data.chapterId">
                  <div v-for="(lesson, key) in data.lessons" :key="key"
                       class="bg-white border-b-2 py-3 px-5 border-dashed mb-1">
                    <div class="grid grid-cols-2 gap-10">
                      <div>
                        <div class="text-primary">មេរៀន</div>
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
                        <div class="text-primary">លទ្ធផលតេស្ត</div>
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
import Empty from "./../../components/Empty.vue"

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

export default {
  components: {
    doughnutOutlabelGraph,
    LineGraph,
    LoadingIndicator,
    ChevronRigth,
    Empty
  },
  computed: {
    ...mapState('graph', ['graph', 'usage', 'loading', 'subject'])
  },
  data () {
    return {
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
    showAll () {
      this.$router.push({
        name: 'refreshGraph'
      })
    },
    showLesson (chapterId) {
      if (this.selectedChapter == chapterId) {
        this.selectedChapter = ''
        return
      }
      this.selectedChapter = chapterId
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
    showReport () {
      this.month = new Date().getMonth() + 1
      this.loadingArea = true
      this.getUsage(this.month).then(() => {
        for (let i = 0; i < this.usage.length; i++) {
          this.chartOptions.xaxis.categories.push(this.usage[i].day)
          this.series[0].data.push(this.millisToMinutesAndSeconds(this.usage[i].duration))
        }
        this.loadingArea = false
      })
      this.getGraph().then(() => {
        for (let i = 0; i < this.graph.length; i++) {
          this.chartData.labels.push(this.graph[i].title)
          this.chartData.datasets[0].data.push(this.graph[i].totalPercentage)
          this.chartData.datasets[0].backgroundColor.push(this.graph[i].color)
        }
      })
    }
  },
  created () {
    this.showReport()
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
