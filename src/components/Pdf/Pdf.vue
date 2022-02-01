<template>
  <div class="fixed h-full w-full top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70 flex-col parent" @click="closePdf">
    <div class="relative h-12 bg-primary text-white flex px-5 items-center mt-5" :style="{width:`${titleWidth}px`}"
         v-if="titleWidth">
      <div>
        {{title}}
      </div>
      <span class="absolute -right-2 -top-3 cursor-pointer w-6 h-6 rounded-full shadow text-black bg-forest
         flex items-center justify-center z-50"
            @click="()=>{this.$emit('closePdf')}"
      >
          <CloseIcon :width="20"></CloseIcon>
        </span>
    </div>
    <div class="overflow-y-scroll " style="height: 85%;">
      <div id="pageContainer" class="relative bg-primary">
        <div id="viewer" class="pdfViewer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import pdfjsLib from "pdfjs-dist/build/pdf";
import { PDFViewer } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
import CloseIcon from '@/components/CloseIcon'


pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js";

export default {
  components:{
    CloseIcon
  },
  props:{
    pdfUrl:{
      default:()=>{
        return "http://moeysapp.moeys.gov.kh/uploads/pdf/books/27235078.pdf"
      }
    },
    title:{
      default:()=>{
        return "Ministry of Education, Youth, and Sport"
      }
    }
  },
  data(){
    return{
      titleWidth: 0,
    }
  },
  mounted () {
    this.getPdf().then(()=>{
      setTimeout(()=>{
        let pageContainer = document.getElementById("pageContainer")
        this.titleWidth = pageContainer.offsetWidth
      },3000)
    });
  },
  methods: {
    closePdf(e){
      let className = e.target.className
      if(className.includes("parent")){
        this.$emit('closePdf')
      }
    },
    async getPdf () {
      let container = document.getElementById("pageContainer");
      let pdfViewer = new PDFViewer({
        container: container
      });
      let loadingTask = pdfjsLib.getDocument(this.pdfUrl);
      let pdf = await loadingTask.promise;
      pdfViewer.setDocument(pdf);
    }
  }
};
</script>
<style>
#pageContainer {
  width: 100%;
}

</style>
