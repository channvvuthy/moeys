<template>
  <div class="flex items-center justify-center fixed bg-black bg-opacity-70 w-full h-full z-50 left-0 top-0 text-black">
    <div class="bg-white rounded-xl shadow w-100 relative">
      <div class="flex items-center h-12 px-5 border-b text-black text-lg font-black">
        ប្រវត្តិរូប
      </div>
      <div
        class="absolute cursor-pointer w-7 h-7 rounded-full flex items-center
        justify-center bg-forest -right-2 -top-4" @click="()=>{this.$emit('closeProfile')}">
        <CloseIcon></CloseIcon>
      </div>
      <!-- Body -->
      <div style="max-height:38rem;" class="overflow-y-scroll">
        <div class="flex items-center justify-center h-36 flex-col">
          <div>
            <input type="file" name="file" id="file" ref="photo" class="hidden"
                   accept="image/png, image/gif, image/jpeg" @change="selectPhoto">
            <div class="h-20 w-20 rounded-full flex items-center
            cursor-pointer
            justify-center bg-forest relative bg-cover bg-center"
                 @mouseover="()=>{this.isCamera = true}"
                 @mouseleave="()=>{this.isCamera = false}"
                 @click="()=>{this.$refs.photo.click()}"
                 :style="{backgroundImage:`url(${infor.photo})`}">
              <div v-if="infor.photo == null">
                <DefaultProfileIcon :size="55" fill="#fff"></DefaultProfileIcon>
              </div>
              <div class="absolute bottom-1 right-2" v-if="isCamera">
                <CameraIcon></CameraIcon>
              </div>
            </div>
          </div>
          <div class="mt-3">អត្តលេខ {{ infor.student_code }}</div>
        </div>
        <div class="px-5 pb-5">
          <div class="flex items-center">
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              នាមត្រកូល
            </div>
            <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full" v-model="infor.first_name">
          </div>
          <div class="my-4"></div>
          <div class="flex items-center">
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              នាមខ្លួន
            </div>
            <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full" v-model="infor.last_name">
          </div>
          <div class="my-4"></div>
          <div class="flex items-center">
            <div class="flex items-center">
              <label class="border-primary border rounded-full w-4 h-4 flex items-center justify-center">
                <div class="bg-primary h-3 w-3 rounded-full" v-if="infor.gender == 1"></div>
                <input type="radio" name="gender" value="1" class="hidden" v-model="infor.gender">
              </label>
              <div class="ml-5">ប្រុស</div>
            </div>
            <div class="w-10"></div>
            <div class="flex items-center">
              <label class="border-primary border rounded-full w-4 h-4 flex items-center justify-center">
                <div class="bg-primary h-3 w-3 rounded-full" v-if="infor.gender == 0"></div>
                <input type="radio" name="gender" value="0" class="hidden" v-model="infor.gender">
              </label>
              <div class="ml-3">ស្រី</div>
            </div>
          </div>
          <div class="my-4"></div>
          <div class="flex items-center">
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              លេខទូរស័ព្វ
            </div>
            <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full" disabled
                   v-model="infor.phone">
          </div>
          <div class="my-4"></div>
          <div class="flex items-center">
            <div class="border w-40 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              ថ្ងៃខែឆ្នាំកំណើត
            </div>
            <input type="date" id="calen" class="w-full calen  border h-10 px-3 outline-none rounded-r-full"
                   v-model="infor.dob">
          </div>
          <div class="my-4"></div>
          <div class="flex items-center" @click="showProvince">
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              រាជធានី/ខេត្ត
            </div>
            <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full" disabled
                   v-model="infor.province">
          </div>
          <div class="my-4"></div>
          <div class="flex items-center" @click="showProvince">
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              ឈ្មោះសាលា
            </div>
            <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full" disabled
                   v-model="infor.school">
          </div>
          <div class="my-4"></div>
          <div class="flex items-center" @click="showProvince">
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              ថ្នាក់
            </div>
            <input type="text" class="w-full  border h-10 px-3 outline-none rounded-r-full" disabled
                   v-model="infor.class">
          </div>
          <div class="my-4"></div>
          <div class="flex items-center cursor-pointer" @click="()=>{this.isChangePassword = true}">
            <div class="border w-36 h-10 flex border-r-0 font-black items-center rounded-l-full justify-center">
              លេខសម្ងាត់
            </div>
            <input type="password" class="w-full  border h-10 px-3 outline-none rounded-r-full" disabled
                   v-model="infor.class">
          </div>
          <div class="my-4"></div>
          <button class="bg-primary text-white w-full rounded-full h-10 relative " :disabled="loading" @click="save">
            <div class="absolute top-1 w-full flex items-center justify-center" v-if="loading">
              <LoadingIndicator :bg="false"></LoadingIndicator>
            </div>
            <div v-else>កែប្រែ</div>
          </button>
        </div>
      </div>
    </div>
    <!-- Show province -->
    <template v-if="isProvince">
      <Province @closeProvince="()=>{this.isProvince = false}" @change="change($event)"></Province>
    </template>
    <!-- Show change password -->
    <template v-if="isChangePassword">
      <ChangePassword @closeChangePassword="()=>{this.isChangePassword = false}"></ChangePassword>
    </template>
  </div>
</template>

<script>
import CloseIcon from '@/components/CloseIcon'
import DefaultProfileIcon from '@/components/DefaultProfileIcon'
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import CameraIcon from '@/components/CameraIcon'
import Province from '@/views/Profile/Province'
import LoadingIndicator from '@/components/LoadingIndicator'
import helper from '@/helper'
import ChangePassword from '@/views/Profile/ChangePassword'

export default {
  components: {
    CloseIcon,
    DefaultProfileIcon,
    CameraIcon,
    Province,
    LoadingIndicator,
    ChangePassword
  },
  data () {
    return {
      isCamera: false,
      isProvince: false,
      loading: false,
      isChangePassword: false
    }
  },
  computed: {
    ...mapState('user', ['infor']),
    ...mapState('auth', ['auth'])
  },
  methods: {
    ...mapActions('user', ['getStudentInfo', 'updateInfo']),
    save () {
      this.loading = true
      this.infor.dob = helper.datToMilliseconds(this.infor.dob)
      this.updateInfo(this.infor).then(res => {
        this.auth.user.class = res.data.class
        this.auth.user.classId = res.data.classId
        this.auth.user.typeId = res.data.typeId
        this.$store.commit('auth/refreshClass', res.data.classId)
        this.$store.commit('auth/receivedAuth', this.auth)
        localStorage.setItem('auth', JSON.stringify(this.auth))
        this.loading = false
        this.$emit('closeProfile')
      }).catch(err => {
        helper.error('Something went wrong!')
        this.loading = false
      })
    },
    change (payload) {
      this.infor.province = payload.province.title ? payload.province.title : this.infor.province
      this.infor.provinceId = payload.province.id ? payload.province.id : this.infor.provinceId
      this.infor.class = payload.cl.title ? payload.cl.title : this.infor.class
      this.infor.classId = payload.cl.class_id ? payload.cl.class_id : this.infor.classId
      this.infor.school = payload.school.school_name ? payload.school.school_name : this.infor.school
      this.infor.schoolId = payload.school.id ? payload.school.id : this.infor.schoolId
      this.infor.type_id = payload.type_id
      this.infor.class_id = this.infor.classId
      this.infor.school_name = this.infor.schoolId
      this.infor.pro_id = this.infor.provinceId
    },
    selectPhoto (event) {
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.infor.photo = reader.result
        console.log(this.infor)
      }
    },
    showProvince () {
      this.$store.commit('helper/fetchingProvinces', [])
      this.$store.commit('helper/fetchingSchools', [])
      this.isProvince = true
    }
  },
  created () {
    this.getStudentInfo().then(() => {
      let dob = new Date(parseInt(this.infor.dob))
      moment.locale('en')
      this.infor.dob = moment(dob).format('yyyy-MM-DD')
    })

  }
}
</script>
<style>
.calen::-webkit-calendar-picker-indicator {
  background-image: url("/assets/calendar.svg");
}
</style>
