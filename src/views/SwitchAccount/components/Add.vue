<template>
  <div class="flex items-center justify-center fixed w-full h-full left-0 top-0 z-50 bg-black bg-opacity-90">
    <div class="bg-white shadow rounded-xl w-96">
      <div class="h-12 border-b flex items-center w-full relative px-5">
        <div class="text-lg font-black">បង្កើតគណនីថ្មី</div>
        <div
          class="bg-forest rounded-full shadow w-8 h-8 flex items-center justify-center cursor-pointer absolute -top-4 -right-2"
          @click="()=>{this.$emit('closeAdd')}">
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div style="max-height: 40rem;" class="overflow-y-scroll p-5">
        <div class="grid grid-cols-2 gap-5">
          <input type="text" placeholder="នាមត្រកូល" class="h-10 w-full border-b outline-none">
          <input type="text" placeholder="នាមខ្លួន" class="h-10 w-full border-b outline-none">
        </div>
        <div class="flex my-3">
          <div class="flex items-center">
            <div class="flex items-center">
              <label class="border-primary border rounded-full w-4 h-4 flex items-center justify-center">
                <div class="bg-primary h-3 w-3 rounded-full"></div>
                <input type="radio" name="sex" value="M" class="hidden">
              </label>
              <div class="ml-3">ប្រុស</div>
            </div>
            <div class="w-10"></div>
            <div class="flex items-center">
              <label class="border-primary border rounded-full w-4 h-4 flex items-center justify-center">
                <div class="bg-primary h-3 w-3 rounded-full"></div>
                <input type="radio" name="sex" value="M" class="hidden">
              </label>
              <div class="ml-3">ស្រី</div>
            </div>

          </div>
        </div>
        <div class="relative">
          <div class="absolute bg-white bottom-1 py-1 text-placeholder" v-if="!dob">ថ្ងៃខែឆ្នាំកំណើត</div>
          <input type="date" ref="dob" id="calendar" v-model="dob"
                 class="w-full h-10 outline-none border-b bg-transparent">
        </div>
        <div class="h-12 border-b flex items-center justify-between">
          <div class="text-placeholder">រាជធាន/ខេត្ត</div>
          <div class="transform cursor-pointer" @click="()=>{this.isProvince = ! this.isProvince}" :class="isProvince?`-rotate-90`:`rotate-90`">
            <ChevronRigth :width="10" fill="#000"></ChevronRigth>
          </div>
        </div>
        <!-- Province -->
        <div class="border border-t-0 overflow-y-scroll h-40 pb-3 cursor-pointer rounded-b-xl" v-if="isProvince">
          <div v-for="(province, index) in provinces" :key="index" class="py-1 px-5 cursor-pointer" :class="index < (provinces.length - 1)?`border-b`:``">
            {{province.title}}
          </div>
        </div>
        <div class="h-12 border-b flex items-center justify-between">
          <div class="text-placeholder">ឈ្មោះសាលា</div>
          <div class="transform rotate-90 cursor-pointer">
            <ChevronRigth :width="10" fill="#000"></ChevronRigth>
          </div>
        </div>
        <div class="h-12 border-b flex items-center justify-between">
          <div class="text-placeholder">ថ្នាក់ទី</div>
          <div class="transform rotate-90 cursor-pointer">
            <ChevronRigth :width="10" fill="#000"></ChevronRigth>
          </div>
        </div>
        <div class="mt-5">
          <button class="bg-primary text-white rounded-full h-10 w-full">យល់ព្រម</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import ChevronRigth from '@/components/ChevronRigth'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    CloseIcon,
    ChevronRigth
  },
  data () {
    return {
      dob: '',
      isProvince: false
    }
  },
  computed: {
    ...mapState('helper', ['provinces'])
  },
  methods: {
    ...mapActions('helper', ['getProvinces'])
  },
  mounted () {
    this.getProvinces()
  }
}
</script>

<style>
#calendar::-webkit-calendar-picker-indicator {
  background-image: url("/assets/calendar.svg");
}
</style>
