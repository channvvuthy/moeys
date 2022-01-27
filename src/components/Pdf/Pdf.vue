<template>
  <div class="w-2/4 overflow-y-scroll flex flex-col items-center justify-center h-4/5">
    <pdf
      v-for="i in numPages"
      :key="i"
      :src="pdfFile"
      :page="i"
      style="width: 100%"
    ></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'Pdf',
  props: {
    pdfUrl:{
      default:function (){
        return ''
      }
    }
  },
  components: {
    pdf
  },
  data () {
    return {
      pdfFile: '',
      numPages: undefined,
      loading: false
    }
  },
  methods: {
    destroy: function () {

    }
  },
  created () {
    this.loading = true
    if(this.pdfUrl){
      this.pdfFile = pdf.createLoadingTask(this.pdfUrl);
      this.pdfFile.promise.then(pdf => {
        this.numPages = pdf.numPages;
        this.loading = false
      })
    }
  }
}
</script>
