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
      <div style="max-height: 40rem;" class="overflow-y-scroll  p-5 custom-scroll">
        <div class="grid grid-cols-2 gap-5">
          <input type="text" placeholder="នាមត្រកូល" class="h-10 w-full border-b outline-none"
                 ref="firstName"
                 v-model="payload.first_name">
          <input type="text" placeholder="នាមខ្លួន" class="h-10 w-full border-b outline-none"
                 ref="lastName"
                 v-model="payload.last_name">
        </div>
        <div class="flex my-3">
          <div class="flex items-center">
            <div class="flex items-center">
              <label class="border-primary border rounded-full w-4 h-4 flex items-center justify-center">
                <div class="bg-primary h-3 w-3 rounded-full" v-if="payload.gender == 1"></div>
                <input type="radio" name="gender" value="1" class="hidden" v-model="payload.gender">
              </label>
              <div class="ml-3">ប្រុស</div>
            </div>
            <div class="w-10"></div>
            <div class="flex items-center">
              <label class="border-primary border rounded-full w-4 h-4 flex items-center justify-center">
                <div class="bg-primary h-3 w-3 rounded-full" v-if="payload.gender == 0"></div>
                <input type="radio" name="gender" value="0" class="hidden" v-model="payload.gender">
              </label>
              <div class="ml-3">ស្រី</div>
            </div>

          </div>
        </div>
        <div class="relative">
          <div class="absolute bg-white bottom-1 py-1 text-placeholder" v-if="!payload.dob">ថ្ងៃខែឆ្នាំកំណើត</div>
          <input type="date" ref="dob" id="calen" v-model="payload.dob"
                 class="w-full h-10 outline-none border-b bg-transparent">
        </div>
        <div class="h-12 border-b flex items-center justify-between cursor-pointer"
             @click="()=>{this.isProvince = ! this.isProvince}">
          <div :class="provinceName ? '': 'text-placeholder'">{{ provinceName ? provinceName : `រាជធាន/ខេត្ត` }}</div>
          <div class="transform cursor-pointer mr-2" :class="isProvince?`-rotate-90`:`rotate-90`">
            <ChevronRigth :width="10" fill="#174B7C"></ChevronRigth>
          </div>
        </div>
        <!-- Province -->
        <div class="border border-t-0 overflow-y-scroll custom-scroll h-40 pb-3 cursor-pointer rounded-b-xl" v-if="isProvince">
          <div v-for="(province, index) in provinces" :key="index" class="py-1 px-5 cursor-pointer"
               @click="selectProvince(province)"
               :class="index < (provinces.length - 1)?`border-b`:``">
            {{ province.title }}
          </div>
        </div>
        <div class="h-12 border-b flex items-center justify-between cursor-pointer"
             @click="showSchool">
          <div :class="schoolName ? '': 'text-placeholder'">{{ schoolName ? schoolName : `ឈ្មោះសាលា` }}</div>
          <div class="transform cursor-pointer mr-2" :class="isSchool?`-rotate-90`:`rotate-90`">
            <ChevronRigth :width="10" fill="#174B7C"></ChevronRigth>
          </div>
        </div>
        <!-- School -->
        <div class="border border-t-0 overflow-y-scroll custom-scroll h-48 pb-3 cursor-pointer rounded-b-xl" v-if="isSchool">
          <input type="text" placeholder="ស្វែងរក..." class="outline-none border-b w-full h-10 px-5" v-model="query">
          <div v-for="(school, index) in schoolQuery" :key="index" class="py-1 px-5 cursor-pointer"
               @click="selectSchool(school)"
               :class="index < (schoolQuery.length - 1)?`border-b`:``">
            {{ school.school_name }}
          </div>
        </div>
        <div class="h-12 border-b flex items-center justify-between cursor-pointer"
             @click="showClass">
          <div :class="clName ? '': 'text-placeholder'">{{ clName ? clName : `ថ្នាក់ទី` }}</div>
          <div class="transform cursor-pointer mr-2" :class="isClass?`-rotate-90`:`rotate-90`">
            <ChevronRigth :width="10" fill="#174B7C"></ChevronRigth>
          </div>
        </div>
        <!-- Class -->
        <div class="border border-t-0 overflow-y-scroll custom-scroll h-48 pb-3 cursor-pointer rounded-b-xl" v-if="isClass">
          <div v-for="(cl, index) in classes" :key="index" class="py-1 px-5 cursor-pointer"
               @click="selectClass(cl)"
               :class="index < (classes.length - 1)?`border-b`:``">
            {{ cl.title }}
          </div>
        </div>
        <!-- Type -->
        <div class="flex justify-end items-center mt-3 text-sm" v-if="showType">
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
        <div class="mt-5">
          <button class="bg-primary text-white rounded-full h-10 w-full relative" @click="save" :disabled="loading">
            <div class="absolute flex items-center justify-center w-full h-full left-0 top-0" v-if="loading">
              <div class="mt-13">
                <LoadingIndicator :bg="false"></LoadingIndicator>
              </div>
            </div>
            <div v-else>
              យល់ព្រម
            </div>
          </button>
        </div>
      </div>
    </div>
    <!-- Message -->
    <template v-if="isMessage">
      <Message message="សូមធ្វើការជ្រើសរើសខេត្តជាមុនសិន" @closeMessage="()=>{this.isMessage = false}"></Message>
    </template>
    <!-- Message -->
    <template v-if="isReqSchool">
      <Message message="សូមធ្វើការជ្រើសរើសសាលា" @closeMessage="()=>{this.isReqSchool = false}"></Message>
    </template>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import ChevronRigth from '@/components/ChevronRigth'
import { mapActions, mapState } from 'vuex'
import Message from '@/components/Message/Message'
import helper from '@/helper'
import LoadingIndicator from '@/components/LoadingIndicator'

export default {
  components: {
    CloseIcon,
    ChevronRigth,
    Message,
    LoadingIndicator
  },
  data () {
    return {
      dob: '',
      isProvince: false,
      isSchool: false,
      provinceName: '',
      schoolName: '',
      clName: '',
      query: '',
      isMessage: false,
      isReqSchool: false,
      isClass: false,
      showType: false,
      loading: false,
      payload: {
        first_name: '',
        last_name: '',
        gender: 1,
        pro_id: '',
        type_id: 1,
        class_id: '',
        school_name: '',
        dob: '',
      }
    }
  },
  computed: {
    ...mapState('helper', ['provinces', 'schools', 'classes']),
    schoolQuery () {
      if (this.query) {
        return this.schools.filter((item) => {
          return this.query.toLowerCase().split(' ').every(v => item.school_name.toLowerCase().includes(v))
        })
      } else {
        return this.schools
      }
    }
  },
  methods: {
    ...mapActions('helper', ['getProvinces', 'getSchools', 'getClasses']),
    ...mapActions('user', ['addNewStudent']),
    showClass () {
      if (this.schoolName == '') {
        this.isReqSchool = true
        return
      }
      this.isClass = !this.isClass

    },
    selectClass (cl) {
      if (cl.class_id == 10 || cl.class_id == 11 || cl.class_id == 12) {
        this.showType = true
      } else {
        this.showType = false
      }
      this.payload.class_id = cl.class_id
      this.clName = cl.title
      this.isClass = false
    },
    showSchool () {
      if (this.provinceName == '') {
        this.isMessage = true
        return
      }
      this.isSchool = !this.isSchool
    },
    selectSchool (school) {
      this.schoolName = school.school_name
      this.isSchool = false
      this.payload.school_name = school.id
    },
    selectProvince (province) {
      this.payload.pro_id = province.id
      this.provinceName = province.title
      this.getSchools(province.id).then(() => {
        this.isProvince = !this.isProvince
        this.getClasses()
      })
    },
    save () {
      if (!this.payload.first_name) {
        helper.error('សូមបញ្ចូលនាមត្រកូល')
        this.$refs.firstName.focus()
        return
      }
      if (!this.payload.last_name) {
        helper.error('សូមបញ្ចូលនាមខ្លួន')
        this.$refs.lastName.focus()
        return
      }
      if (!this.payload.dob) {
        helper.error('សូមជ្រើសរើសថ្ងៃខែឆ្នាំកំណើត')
        return
      }
      if (!this.payload.pro_id) {
        helper.error('សូមជ្រើសរើសខេត្ត')
        return
      }
      if (!this.payload.school_name) {
        helper.error('សូមជ្រើសរើសសាលា')
        return
      }
      if (!this.payload.class_id) {
        helper.error('សូមជ្រើសរើសថ្នាក់')
        return
      }
      this.loading = true
      this.addNewStudent(this.payload).then(res => {
        this.loading = false
        localStorage.clear()
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('token_type', 'Bearer')
        localStorage.setItem('auth', JSON.stringify({ user: res.data }))
        this.$store.commit('auth/receivedAuth', { user: res.data })
        this.$store.commit('auth/getToken', res.data.access_token)
        this.$router.push({
          name: 'Home'
        })
      })
    }
  },
  mounted () {
    this.getProvinces()
  }
}
</script>

<style>
#calen::-webkit-calendar-picker-indicator {
  background-image: url("/assets/calendar.svg");
}
</style>
