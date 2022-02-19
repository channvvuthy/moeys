<template>
  <div
    class="flex items-center justify-center items-center w-full h-full top-0 left-0 z-50 bg-black bg-opacity-80 fixed">
    <div class="w-100 bg-white rounded-xl shadow relative">
      <div class="h-12 border-b flex items-center">
        <div class="text-lg font-black px-5">
          {{isGrade?` ថ្នាក់`:`ាជធានី/ខេត្ត សាលា`}}
        </div>
        <div class="absolute w-7 h-7 bg-forest rounded-full
        shadow flex items-center justify-center -right-2 -top-4 cursor-pointer"
             @click="()=>{this.$emit('closeProvince')}"
        >
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div class="p-5">
        <div v-if="!isGrade" class="flex items-center relative" @click="()=>{this.isProvince = ! this.isProvince}">
          <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
            រាជធានី/ខេត្ត
          </div>
          <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full bg-white cursor-pointer"
                 placeholder="ជ្រើសរើសរាជធានី/ខេត្ត" disabled
                 :value="province.title"
          >
          <div></div>
        </div>
        <div class="transform rotate-180 absolute ml-3 bg-white" v-if="isProvince">
          <ArrowIcon></ArrowIcon>
        </div>
        <!-- Show province -->
        <div v-if="isProvince" class="h-40 overflow-y-scroll border rounded-md mt-5">
          <div v-for="(province, index) in provinces" :key="index" class="cursor-pointer">
            <div class="h-10 flex items-center px-3" :class="index < (provinces.length - 1)?`border-b`:``"
                 @click="selectProvince(province)"
            >
              {{ province.title }}
            </div>
          </div>
        </div>
        <template v-if="!isGrade">
          <div class="my-5"></div>
          <div class="flex items-center cursor-pointer" @click="showSchool">
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              ឈ្មោះសាលា
            </div>
            <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full bg-white cursor-pointer"
                   :value="school.school_name"
                   placeholder="ជ្រើសរើសសាលា" disabled>
          </div>
        </template>
        <!-- Show school -->
        <div class="transform rotate-180 absolute ml-3 bg-white" v-if="isSchool">
          <ArrowIcon></ArrowIcon>
        </div>
        <div v-if="isSchool" class="h-40 overflow-y-scroll border rounded-md mt-5">
          <div v-for="(school, index) in schools" :key="index">
            <div class="h-10 flex items-center px-3 cursor-pointer" :class="index < (schools.length - 1)?`border-b`:``"
                 @click="selectSchool(school)"
            >
              {{ school.school_name }}
            </div>
          </div>
        </div>
        <template v-if="isGrade">
          <div class="flex items-center cursor-pointer" @click="()=>{this.isClass = !this.isClass}" s>
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              ថ្នាក់
            </div>
            <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full" :value="cl.title"
                   placeholder="ជ្រើសរើសថ្នាក់">
          </div>
        </template>
        <!-- Show class -->
        <div class="transform rotate-180 absolute ml-3 bg-white" v-if="isClass">
          <ArrowIcon></ArrowIcon>
        </div>
        <div v-if="isClass" class="h-40 overflow-y-scroll border rounded-md mt-5">
          <div v-for="(cl, index) in classes" :key="index">
            <div class="h-10 flex items-center px-3 cursor-pointer" :class="index < (classes.length - 1)?`border-b`:``"
                 @click="selectClass(cl)"
            >
              {{ cl.title }}
            </div>
          </div>
        </div>
        <div class="flex justify-end items-center mt-5 text-sm" v-if="showType">
          <label class="flex items-center">
            <input type="radio" name="type_id" v-model="payload.type_id" value="1" class="hidden">
            <div class="w-4 h-4 rounded-full border-primary border flex items-center justify-center">
              <div class="rounded-full h-3 w-3 bg-primary" v-if="payload.type_id == 1"></div>
            </div>
            <div class="ml-3">ថ្នាក់វិទ្យាសាស្រ្ត</div>
          </label>
          <div class="mx-3"></div>
          <label class="flex items-center">
            <input type="radio" name="type_id" v-model="payload.type_id" value="2" class="hidden">
            <div class="w-4 h-4 rounded-full border-primary border flex items-center justify-center">
              <div class="rounded-full h-3 w-3 bg-primary" v-if="payload.type_id == 2"></div>
            </div>
            <div class="ml-3">ថ្នាក់វិទ្យាសាស្រ្តសង្គម</div>
          </label>
        </div>
        <div class="my-5"></div>
        <button class="bg-primary text-white w-full rounded-full h-10" @click="change">កែប្រែ</button>
      </div>
    </div>
    <Message v-if="isMessage" @closeMessage="()=>{this.isMessage = false}"
             message="សូមធ្វើការជ្រើសរើសសាលា"></Message>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import { mapState, mapActions } from 'vuex'
import ArrowIcon from '@/components/ArrowIcon'
import Message from '@/components/Message/Message'

export default {
  data () {
    return {
      province: {},
      school: {},
      cl: {},
      isProvince: false,
      isSchool: false,
      isClass: false,
      isMessage: false,
      pro_id: '',
      school_name: '',
      showType: false,
      payload: {
        type_id: 1
      }

    }
  },
  components: {
    ArrowIcon,
    CloseIcon,
    Message
  },
  computed: {
    ...mapState('helper', ['schools', 'provinces', 'classes', 'loading', 'loadingSchool', 'loadingClass', 'isGrade']),
  },
  methods: {
    ...mapActions('helper', ['getProvinces', 'getSchools', 'getClasses']),
    showSchool () {
      if (this.province.title == '') {
        this.isMessage = true
      } else {
        this.isSchool = !this.isSchool
      }
    },
    selectProvince (province) {
      this.province = province
      this.getSchools(province.id).then(() => {
        this.isProvince = false
      })
    },
    selectSchool (school) {
      this.school = school
      this.isSchool = false
    },
    selectClass (cl) {
      this.cl = cl
      this.isClass = false
      this.showType = cl.class_id >= 10
    },
    change () {
      this.payload.school = this.school
      this.payload.province = this.province
      this.payload.cl = this.cl
      if (this.province.id) {
        if (!this.school.id) {
          this.isMessage = true
          return
        }
      }
      this.$emit('change', this.payload)
      this.$emit('closeProvince')
    }
  },
  mounted () {
    this.getProvinces()
    this.getClasses()
  },
  watch: {
    'isGrade': function (value) {
      alert(1)
    }
  }
}
</script>

<style scoped>

</style>
