<template>
  <div
    class="fixed h-full w-full top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70 flex-col parent"
    @click="closePdf">
    <div class="relative h-12 bg-primary text-white flex px-5 items-center mt-5 rounded-t-md"
         :style="{width:`${titleWidth}px`}"
         v-if="titleWidth">
      <div>
        {{ title }}
      </div>
      <span class="absolute -right-2 -top-3 cursor-pointer w-6 h-6 rounded-full shadow text-black bg-forest
         flex items-center justify-center z-50"
            @click="closeReading"
      >
          <CloseIcon :width="20"></CloseIcon>
        </span>
    </div>
    <div class="overflow-y-scroll custom-scroll bg-white"
         @scroll="onScroll"
         style="height: 85%;max-width: 90%;min-width:665px;">
      <div v-if="loading" class="text-black p-5">Loading....</div>
      <div id="pageContainer" class="relative bg-primary">
        <div id="viewer" class="pdfViewer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import pdfjsLib from 'pdfjs-dist/build/pdf'
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
import CloseIcon from '@/components/CloseIcon'
import { mapActions, mapState } from 'vuex'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

export default {
  components: {
    CloseIcon
  },
  props: {
    pdfUrl: {
      default: () => {
        return ''
      }
    },
    isDownload: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    title: {
      default: () => {
        return 'Ministry of Education, Youth, and Sport'
      }
    }
  },
  computed: {
    ...mapState('library', ['readBookId'])
  },
  data () {
    return {
      titleWidth: 0,
      loading: false,
      payload: {
        b_id: '',
        percentages: '',
        pages: ''
      }
    }
  },
  mounted () {
    this.loading = true
    this.getPdf().then(() => {
      this.loading = false
      setTimeout(() => {
        let pageContainer = document.getElementById('pageContainer')
        this.titleWidth = pageContainer.offsetWidth
      }, 3000)
    })
  },
  methods: {
    ...mapActions('library', ['bookHistory']),
    onScroll ({
      target: {
        scrollTop,
        clientHeight,
        scrollHeight
      }
    }) {
      let currentPage = Math.round((scrollTop + clientHeight) / 994)
      let pages = document.querySelectorAll('#viewer > div').length
      let percentages = (currentPage / pages) * 100
      this.payload.pages = currentPage
      this.payload.percentages = percentages.toFixed(2)
      this.payload.b_id = this.readBookId
    },
    closeReading () {
      if (!this.isDownload) {
        if (this.payload.b_id) {
          this.bookHistory(this.payload)
        }
      }
      this.$emit('closePdf')

    },
    closePdf (e) {
      let className = e.target.className
      try {
        if (className.includes('parent')) {
          this.$emit('closePdf')
        }
      } catch (err) {
        return err
      }
    },
    async getPdf () {
      let container = document.getElementById('pageContainer')
      let pdfViewer = new PDFViewer({
        container: container
      })
      let loadingTask = pdfjsLib.getDocument(this.pdfUrl)
      let pdf = await loadingTask.promise
      pdfViewer.setDocument(pdf)
    }
  }
}
</script>
<style>
#pageContainer {
  width: 100%;
}
</style>
