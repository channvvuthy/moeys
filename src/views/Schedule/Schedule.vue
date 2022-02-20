<template>
  <div class="relative bg-forest h-screen overflow-y-scroll pb-40 custom-scroll">
    <div class="flex items-center justify-center items-center h-screen" v-if="loading">
      <div>
        <LoadingIndicator></LoadingIndicator>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-center items-center h-screen w-full" v-if="schedules.length == 0">
        <Empty></Empty>
      </div>
      <div v-else>
        <div class="p-5">
          <div class="grid grid-cols-2 gap-5">
            <div v-for="(schedule, index) in schedules" :key="index" class="rounded-md py-3 px-5 bg-white shadow">
              <div class="border-l-4 border-primary pl-3">
                <div class="font-black">
                  {{ scheduleDays(schedule.scheduleDays) }}
                </div>
                <div class="flex items-center my-2">
                  <div>
                    <ClockIcon :size="20"></ClockIcon>
                  </div>
                  <div class="pl-3 text-sm">
                    {{ msToTime(schedule.scheduleTime) }}
                  </div>
                </div>
                <div>
                  {{ schedule.subjcetTitle }}
                </div>
              </div>
              <div class="flex justify-end text-sm">
                <button class="bg-primary text-white rounded-full h-7 w-14" @click="edit(schedule)">
                  កែប្រែ
                </button>
                <button class="bg-danger text-white rounded-full  h-7 w-14 mx-3" @click="confirm(schedule.scheduleId)">
                  លុប
                </button>
                <div>
                  <button class="bg-primary h-7 w-12 rounded-full flex items-center justify-end pr-1"
                          v-if="schedule.isActive" @click="updateIsActive(schedule.scheduleId,0)">
                    <div class="rounded-full h-6 w-6 bg-white"></div>
                  </button>
                  <button class="bg-gray-300 h-7 w-12 rounded-full flex items-center justify-start pl-1"
                          @click="updateIsActive(schedule.scheduleId,1)" v-else>
                    <div class="rounded-full h-6 w-6 bg-white"></div>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add -->
    <div class="fixed left-0 bottom-0 pb-10 w-full flex justify-end px-10">
      <div class="cursor-pointer" @click="()=>{this.isAdd = true}">
        <AddIcon :size="40" fill="#174B7C"></AddIcon>
      </div>
    </div>
    <!-- Schedule -->
    <template v-if="isAdd">
      <SetSchedule @closeAdd="()=>{this.isAdd = false}"></SetSchedule>
    </template>
    <!-- Confirm -->
    <template v-if="isConfirm">
      <Confirm @closeMessage="()=>{this.isConfirm = false}" @delete="deleteMySchedule"></Confirm>
    </template>
    <!-- Update -->
    <template v-if="isEdit">
      <EditSchedule @closeEdit="()=>{this.isEdit = false}"></EditSchedule>
    </template>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator'
import { mapActions, mapState } from 'vuex'
import Empty from '@/components/Empty'
import AddIcon from '@/components/AddIcon'
import SetSchedule from '@/views/Schedule/components/SetSchedule'
import EditSchedule from '@/views/Schedule/components/EditSchedule'
import ClockIcon from '@/components/ClockIcon'
import Confirm from '@/components/Message/Confirm'

export default {
  components: {
    LoadingIndicator,
    Empty,
    AddIcon,
    SetSchedule,
    ClockIcon,
    Confirm,
    EditSchedule
  },
  data () {
    return {
      isAdd: false,
      isConfirm: false,
      scheduleId: null,
      isEdit: false,
    }
  },
  computed: {
    ...mapState('schedule', ['schedules', 'loading'])
  },
  methods: {
    ...mapActions('schedule', ['getSchedule', 'deleteSchedule', 'updateRepeat']),
    edit (schedule) {
      this.$store.commit('schedule/mySchedule', schedule)
      this.isEdit = true
    },
    updateIsActive (scheduleId, isActive) {
      let payload = {
        schedule_id: scheduleId,
        isActive: isActive
      }
      this.updateRepeat(payload)
    },
    deleteMySchedule () {
      this.deleteSchedule(this.scheduleId).then(() => {
        this.isConfirm = false
      })
    },
    confirm (scheduleId) {
      this.scheduleId = scheduleId
      this.isConfirm = true
    },
    scheduleDays (scheduleDays) {
      let days = ''
      for (let i = 0; i < scheduleDays.length; i++) {
        days += this.dayNumberToText(scheduleDays[i]) + ', '
      }
      days = days.slice(0, -2)
      return days
    },
    msToTime (miliseconds) {
      miliseconds = parseInt(miliseconds)
      let ampm = 'AM'
      const date = new Date(miliseconds)
      let hour = date.getHours()
      if (hour > 12) {
        hour = hour - 12
        ampm = 'PM'
      }
      return hour + ':' + date.getMinutes() + ' ' + ampm
    },
    dayNumberToText (day) {
      if (day == 1) {
        return 'ច័ន្ទ'
      }
      if (day == 2) {
        return 'អង្គារ'
      }
      if (day == 3) {
        return 'ពុធ'
      }
      if (day == 4) {
        return 'ព្រហស្បតិ៍'
      }
      if (day == 5) {
        return 'សុក្រ'
      }
      if (day == 6) {
        return 'សៅរ៏'
      }
      if (day == 7) {
        return 'អាទិត្យ'
      }
    },
  },
  mounted () {
    this.getSchedule()
  }
}
</script>

<style scoped>

</style>
