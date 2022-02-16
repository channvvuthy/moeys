<template>
  <div class="bg-white h-full">
    <div class="flex items-center shadow bg-white p-3 overflow-x-scroll">
      <div class="w-40 text-center relative">
        <div class="h-16 w-16 rounded-full flex items-center justify-center cursor-pointer m-auto bg-primary">
          <img src="/assets/book.svg" class="w-9">
        </div>
        <div class="text-center text-sm mt-3 font-semibold">
          ទាំងអស់
        </div>
        <div class="border-b-4 border-primary absolute bottom-0 left-0 w-full -bottom-5"></div>
      </div>
      <div v-for="(gr, index) in graph" :key="index" class="w-40 text-center">
        <div class="h-16 w-16 rounded-full flex items-center justify-center cursor-pointer m-auto"
             :style="{backgroundColor:`${gr.color}`}">
          <img :src="gr.icon" class="w-8">
        </div>
        <div class="text-center text-sm mt-3 font-semibold whitespace-nowrap">
          {{ gr.title }}
        </div>
      </div>
    </div>
    <div>
      <div v-if="filter == `all`" class="flex justify-between">
        <div class="w-1/2 my-5">
          <div class="text-xl text-center mb-5 text-primary underline font-bold">គ្រប់មុខវិជ្ជាទាំងអស់</div>
          <doughnutOutlabelGraph :chart-data="chartData"></doughnutOutlabelGraph>
        </div>
        <div class="h-screen border">
        </div>
        <div class="my-5 w-1/2">
          <div class="text-xl text-center mb-5 text-primary underline font-bold">
            សរុបម៉ោងប្រើប្រាស់ទាំងអស់
          </div>
          <div>
            <LineGraph :chart-data="lineData"></LineGraph>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import doughnutOutlabelGraph from '@/views/Graph/doughnut-outlabel-graph'
import LineGraph from '@/views/Graph/LineGraph'

export default {
  components: {
    doughnutOutlabelGraph,
    LineGraph
  },
  computed: {
    ...mapState('graph', ['graph'])
  },
  data () {
    return {
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
      lineData: {
        labels: 7,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    }
  },
  methods: {
    ...mapActions('graph', ['getGraph', 'getUsage']),
  },
  created () {
    this.getUsage(2)
    this.getGraph().then(() => {
      for (let i = 0; i < this.graph.length; i++) {
        this.chartData.labels.push(this.graph[i].title)
        this.chartData.datasets[0].data.push(this.graph[i].totalPercentage)
        this.chartData.datasets[0].backgroundColor.push(this.graph[i].color)
      }
    })
  }
}
</script>

<style scoped>

</style>
