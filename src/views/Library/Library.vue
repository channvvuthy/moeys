<template>
  <div class="p-5 bg-forest h-full">
    <!-- Loading -->
<!--    <div class="flex items-center justify-center h-full w-full" v-if="loadingType">-->
<!--      <LoadingIndicator></LoadingIndicator>-->
<!--    </div>-->
    <div>
      <div class="flex items-center">
        <div v-for="(type, index) in types" :key="index">
          <div class="px-5 py-2 cursor-pointer hover:bg-tertiary bg-primary text-white"
               :class="index == 0 ?`rounded-l`:
                index == (types.length - 1) ?`rounded-r`: ``"
               :style="index == active?{backgroundColor:`#153f67`}:{}"
          >
            {{type.bookTypeTitle}}
          </div>
        </div>
      </div>
      <div class="h-10 w-96 border border-primary my-5 rounded flex items-center px-5 justify-between cursor-pointer" @click="()=>{this.isFilter = true}">
        <div>
          {{label}}
        </div>
        <div class="transform rotate-90">
          <ChevronRight :size="10" :fill="`#000`"></ChevronRight>
        </div>
      </div>
      <!-- Filter -->
      <div
        v-if="isFilter"
        class="flex fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 z-50 items-center justify-center">
        <ul class="w-96 bg-white rounded-xl relative" v-if="libraries['filter'].length">
          <div
            @click="() =>{this.isFilter = false}"
            class="absolute -right-4 -top-4 cursor-pointer rounded-full bg-forest shadow w-8 h-8 flex items-center justify-center">
            <CloseIcon :width="24"></CloseIcon>
          </div>
          <li v-for="(f, index) in libraries['filter']" :key="index"
              @click="filterClass(f)"
              class="px-5 py-2 cursor-pointer"
              :class="index < (libraries['filter'].length - 1)?`border-b`:``">
            {{f.title}}
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-4 gap-5 h-full overflow-y-scroll pb-40">
        <div v-for="(l, index) in libraries.data" :key="index">
          <div>
            <div>
              <img :src="l.bookCover">
            </div>
            {{l.bookTitle}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import ChevronRight from '@/components/ChevronRigth'
import CloseIcon from '@/components/CloseIcon'

export default {
  components:{
    LoadingIndicator,
    ChevronRight,
    CloseIcon
  },
  data(){
    return{
      loadingType: false,
      types: [],
      active: 0,
      label: "មើលទាំងអស់",
      catId: null,
      isFilter: false,
      page: 1,
      payload: {
        page: null,
        catId: null,
        filter: ''
      }
    }
  },
  computed:{
    ...mapState('library', ['loading','libraries'])
  },
  methods:{
    ...mapActions('library', ['getLibrary', 'getBookById', 'getBookType']),
    filterClass(f){
      this.label = f.title
      this.isFilter = false
      this.payload.filter = f.id
      this.getType()
    },
    getType(){
      this.loadingType = true
      this.getBookType().then(res=>{
        this.types = res.data
        this.loadingType = false
        if(this.types.length){
          this.catId = this.types[0]['bookTypeId']
          this.payload.catId = this.catId
          this.payload.page = this.page
          this.getLibrary(this.payload).then(res =>{})
        }
      })
    },
  },
  created () {
    this.getType()
  }
}
</script>

<style scoped>

</style>
