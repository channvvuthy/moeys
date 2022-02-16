<script>
import Vue from 'vue'
import ChartDataOutlabels from 'chartjs-plugin-piechart-outlabels'

Vue.use(ChartDataOutlabels)
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          datasets: [
            {
              label: 'News reports',
              backgroundColor: [],
              data: []
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      options: {
        responsive: true,
        plugins: {
          legend: false,
          outlabels: {
            text: '%l %v (%p)',
            color: 'white',
            stretch: 40,
            font: {
              resizable: true,
              minSize: 10,
              maxSize: 12
            }
          }
        },
        layout: {
          padding: 135
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
