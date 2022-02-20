<template>
  <div class="p-5 h-screen overflow-y-scroll bg-forest relative">
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <LoadingIndicator></LoadingIndicator>
    </div>
    <div v-else>
      <div v-if="histories.length">
        <div v-for="(history, index) in groupHistory" :key="index">
          <div class="bg-primary text-white px-3 rounded mb-3 py-2">{{ myFormatDate(history.date) }}</div>
          <div class="grid grid-cols-4 gap-5 mb-3">
            <div v-for="(h, key) in history.history" :key="key"
                 class="bg-white rounded-md overflow-hidden cursor-pointer" @click="historyDetail(h)">
              <div>
                <img :src="h.lessonThumbnail || h.bookCover" class="m-auto">
              </div>
              <div class="mt-2 px-3">
                {{ cutString((h.lessonTitle || h.bookTitle), 25) }}
              </div>
              <div v-if="h.historyType == 1" class="text-sm px-3 mb-3 text-gray-400 flex items-center">
                <div>
                  ទំព័រទី {{ h.historyPage }}
                </div>
                <div>&nbsp;|&nbsp;</div>
                <div>{{ historyDate(h.historyDate) }}</div>
              </div>
              <div v-if="h.historyType == 2" class="text-sm px-3 mb-3 text-gray-400 flex items-center">
                <div>
                  {{ convertHMS(h.historyDuration) }}
                </div>
                <div>&nbsp;|&nbsp;</div>
                <div>{{ historyDate(h.historyDate) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center absolute left-0 top-0 w-full h-full" v-else>
        <Empty></Empty>
      </div>
    </div>
    <div class="h-40"></div>
    <!-- Pdf -->
    <template v-if="isPdf">
      <Pdf :pdf-url="pdfUrl" :title="title" @closePdf="()=>{this.isPdf = false}"></Pdf>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import Empty from '@/components/Empty'
import dateFormat from '@/helper/dateFormat'
import moment from 'moment'
import helper from '@/helper'
import Pdf from '@/components/Pdf/Pdf'

export default {
  components: {
    LoadingIndicator,
    Empty,
    Pdf
  },
  computed: {
    ...mapState('history', ['loading', 'histories'])
  },
  data () {
    return {
      groupHistory: [],
      isPdf: false,
      pdfUrl: '',
      title: ''
    }
  },
  methods: {
    ...mapActions('history', ['getHistory', 'postHistoryUsage', 'getHistoryUsage']),
    getDateFormat (timestamp) {
      return dateFormat.formatDate(timestamp, 'km')
    },
    millisToMinutesAndSeconds (millis) {
      let minutes = Math.floor(millis / 60000)
      let seconds = ((millis % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
    convertHMS (value) {
      const sec = parseInt(value, 10) // convert value to number if it's string
      let hours = Math.floor(sec / 3600) // get hours
      let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
      let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return minutes + ':' + seconds // Return is HH : MM : SS
    },
    historyDate (date) {
      return moment(date).format(' hh:mm A')
    },
    myFormatDate (date) {
      moment.locale('km')
      return moment(date).format('ll')
    },
    cutString (text, limit) {
      return helper.cutString(text, limit)
    },
    historyDetail (history) {
      if (history.historyType == 2) {
        this.$router.push({
          name: 'Watch',
          params: {
            vidId: history.vId
          }
        })
      } else {
        this.pdfUrl = history.bookPDF
        this.title = history.bookTitle
        this.isPdf = true
      }
    }

  },
  mounted () {
    this.getHistory().then(() => {
      let myHistory = this.histories.filter(item => {
        item.historyDate = moment(item.historyDate).format()
        return item
      })
      const groups = myHistory.reduce((groups, history) => {
        const date = history.historyDate.split('T')[0]
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(history)
        return groups
      }, {})
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          history: groups[date]
        }
      })
      this.groupHistory = groupArrays
    })
  }
}
</script>

<style scoped>

</style>
