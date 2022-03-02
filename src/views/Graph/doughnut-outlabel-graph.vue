<script>
import Vue from 'vue'
import ChartDataOutlabels from 'chartjs-plugin-piechart-outlabels'

Vue.use(ChartDataOutlabels)
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  computed: {
    chartData () {
      return this.$store.state.graph.chartData
    }
  },
  data () {
    return {
      options: {
        responsive: true,
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              return data.labels[tooltipItem[0]['index']]
            },
            label: function (tooltipItem, data) {
              let dataset = data.datasets[tooltipItem.datasetIndex]
              let total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue
              })
              let currentValue = dataset.data[tooltipItem.index]
              return currentValue + '%'
            }
          }
        },
        plugins: {
          legend: false,
          outlabels:
            {
              text: '%l',
              color: 'white',
              stretch: 40,
              font:
                {
                  resizable: true,
                  minSize: 10,
                  maxSize: 12
                }
            }
        }
        ,
        layout: {
          padding: 80
        }
      },
    }
  },
  watch: {
    chartData: {
      handler (val) {
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  }
}
</script>
