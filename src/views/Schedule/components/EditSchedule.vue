<template>
  <div class="flex fixed items-center justify-center w-full h-full z-50 bg-black bg-opacity-70 top-0 left-0">
    <div class="bg-white w-96 bg-white rounded-xl shadow relative">
      <div
        class="h-8 w-8 bg-forest rounded-full flex items-center justify-center cursor-pointer absolute -right-2 -top-4"
        @click="()=>{this.$emit('closeEdit')}">
        <CloseIcon></CloseIcon>
      </div>
      <div style="max-height: 45rem;" class="overflow-y-scroll">
        <div class="h-12 border-b flex items-center px-5">
          <div class="text-xl">កំណត់កាលវិភាគ</div>
        </div>
        <div class="p-5">
          <div class="date">
            <div class="mb-1">កំណត់ម៉ោង</div>
            <div>
              <div class="h-9 w-full mt-1 border flex items-center px-3 relative"
                   :class="isHour?`rounded-t-md`:`rounded-md`">
                <div @click="()=>{this.isHour = true}">
                  <span>{{ twellHour(currentHour) }}</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span>{{ currentMinuteInHour < 10 ? `0${currentMinuteInHour}` : currentMinuteInHour }}</span>
                  <span>&nbsp;&nbsp;</span>
                  <span>{{ ampm }}</span>
                </div>
                <div class="absolute right-2 cursor-pointer" v-if="isHour" @click="()=>{this.isHour = false}">
                  <CloseIcon></CloseIcon>
                </div>
              </div>
              <div class="border border-t-0 grid grid-cols-3" v-if="isHour">
                <ul class="h-40 overflow-y-scroll">
                  <li v-for="(time, index) in hours" :key="index" class="px-5 py-2 cursor-pointer"
                      @click="selectedHour(time)">
                    {{ amplList(time) }}
                  </li>
                </ul>
                <ul class="h-40 overflow-y-scroll">
                  <li v-for="(minute, index) in minutes" :key="index" class="px-5 py-2 cursor-pointer"
                      @click="selectMinutInHour(minute)">
                    {{ minute }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div>កំណត់រយៈពេលសិក្សា</div>
            <div>
              <div class="h-9 w-full mt-1 border flex items-center px-3 relative"
                   :class="isTime?`rounded-t-md`:`rounded-md`">
                <div @click="()=>{this.isTime = true}">
                  <span>{{ currentTime }}&nbsp;</span>
                  <span>ម៉ោង</span>
                  <span>&nbsp;:&nbsp;</span>
                  <span>{{ currentMinute < 10 ? `0${currentMinute}` : currentMinute }}&nbsp;</span>
                  <span>នាទី</span>
                </div>
                <div class="absolute right-2 cursor-pointer" v-if="isTime" @click="()=>{this.isTime = false}">
                  <CloseIcon></CloseIcon>
                </div>
              </div>
            </div>
            <div class="border border-t-0 grid grid-cols-2" v-if="isTime">
              <ul class="h-40 overflow-y-scroll">
                <li v-for="(time, index) in times" :key="index"
                    class="border-b border-gray-200 px-5 py-2 cursor-pointer"
                    @click="selectedTime(time)">
                  {{ time }} ម៉ោង
                </li>
              </ul>
              <ul class="h-40 overflow-y-scroll">
                <li v-for="(minute, index) in minutes" :key="index"
                    class="border-b border-gray-200 px-5 py-2 cursor-pointer" @click="selectedMinute(minute)">
                  {{ minute }} នាទី
                </li>
              </ul>
            </div>
            <div class="mt-3 flex items-center">
              <div class="w-20 bg-primary rounded-full h-9 flex items-center justify-end pr-1" v-if="isRepeat">
                <div class="bg-white h-8 w-8 rounded-full cursor-pointer" @click="repeat(0)"></div>
              </div>
              <div class="w-20 bg-gray-300 rounded-full h-9 flex items-center justify-start pl-1" v-else>
                <div class="bg-white h-8 w-8 rounded-full cursor-pointer" @click="repeat(1)"></div>
              </div>
              <div class="ml-3">
                រោទ៏ម្ដងទៀត
              </div>
            </div>
            <div class="flex mt-3">
              <div v-for="(day, index) in days" :key="index"
                   :class="isDay(day) ? `bg-primary text-white`: `bg-forest shadow`"
                   @click="selectedDay(day)"
                   class="mr-3 h-8 w-8 cursor-pointer flex items-center justify-center rounded-full relative">
                {{ dayNumberToText(day) }}
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div>ជ្រើសរើសមុខវិជ្ជា</div>
            <div class="h-40 overflow-y-scroll mt-3">
              <div v-for="(subject, index) in subjects" :key="index">
                <div
                  class="bg-forest mb-3 shadow-md rounded-md p-3 cursor-pointer text-sm flex items-center justify-between"
                  @click="selectedSubject(subject.subjectId)">
                  <div>{{ subject.subjectTitle }}</div>
                  <div v-if="subjectSelected == subject.subjectId">
                    <CheckIcon :size="18"></CheckIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end px-5 mb-3">
        <button class="text-white bg-primary h-11 w-24 rounded relative flex items-center justify-center" @click="save">
          <div v-if="!loading">
            កែប្រែ
          </div>
          <div class="absolute top-1 left-2  flex items-center justify-center" v-else>
            <LoadingIndicator :bg="false"></LoadingIndicator>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CloseIcon from '@/components/CloseIcon'
import { mapActions, mapState } from 'vuex'
import CheckIcon from '@/components/CheckIcon'
import LoadingIndicator from '@/components/LoadingIndicator'

export default {
  name: 'SetSchedule',
  data () {
    return {
      times: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      minutes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
        , 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      currentTime: 1,
      currentMinute: 0,
      currentHour: 12,
      currentMinuteInHour: 12,
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      isTime: false,
      isHour: false,
      ampm: 'AM',
      isRepeat: 1,
      loading: false,
      subjectSelected: '',
      days: [1, 2, 3, 4, 5, 6, 7],
      cachedSchedule: [],
      payload: {
        scheduleId: null,
        subjectId: null,
        scheduleTime: null,
        scheduleDuration: null,
        isRepeat: 1,
        isActive: 1,
        scheduleDays: [1]
      }
    }
  },
  components: {
    CloseIcon,
    CheckIcon,
    LoadingIndicator
  },
  computed: {
    ...mapState('course', ['subjects']),
    ...mapState('schedule', ['schedule'])
  },
  methods: {
    ...mapActions('course', ['getSubject']),
    ...mapActions('schedule', ['updateSchedule', 'getSchedule']),
    repeat (r) {
      if (r == 0) {
        this.cachedSchedule = this.payload.scheduleDays
        this.payload.scheduleDays = []
      } else {
        this.payload.scheduleDays = this.cachedSchedule
      }
      this.isRepeat = r
      this.payload.isRepeat = this.isRepeat
    },
    save () {
      this.miliseconds(this.currentHour, this.currentMinuteInHour)
      this.payload.scheduleId = this.schedule.scheduleId
      this.payload.subjectId = this.subjectSelected
      this.payload.scheduleTime = this.miliseconds(this.currentHour, this.currentMinuteInHour)
      this.payload.scheduleDuration = this.duration(this.currentTime, this.currentMinute)
      this.loading = true
      this.updateSchedule(this.payload).then(() => {
        this.loading = false
        this.getSchedule().then(() => {
          this.$emit('closeEdit')
        })

      })
    },
    dayNumberToText (day) {
      if (day == 1) {
        return 'ច'
      }
      if (day == 2) {
        return 'អ'
      }
      if (day == 3) {
        return 'ព'
      }
      if (day == 4) {
        return 'ព្រ'
      }
      if (day == 5) {
        return 'ស'
      }
      if (day == 6) {
        return 'សរ'
      }
      if (day == 7) {
        return 'អា'
      }
    },
    isDay (day) {
      for (let i = 0; i < this.payload.scheduleDays.length; i++) {
        if (day == this.payload.scheduleDays[i]) {
          return true
        }
      }
      return false
    },
    amplList (time) {
      if (time > 12) {
        return time = time - 12 + ' PM'
      }
      return time + ' AM'
    },
    twellHour (time) {
      if (time > 12) {
        return time = time - 12
      }
      return time
    },
    selectedDay (day) {
      if (this.isDay(day)) {
        this.payload.scheduleDays = this.payload.scheduleDays.filter(item => item != day)
      } else {
        this.payload.scheduleDays.push(day)
        this.cachedSchedule.push(day)
      }
    },
    selectedTime (time) {
      this.currentTime = time
    },
    selectedMinute (minute) {
      this.currentMinute = minute
    },
    selectedHour (hour) {
      if (hour > 12) {
        this.ampm = 'PM'
      } else {
        this.ampm = 'AM'
      }
      this.currentHour = hour
    },
    selectMinutInHour (minut) {
      this.currentMinuteInHour = minut
    },
    selectedSubject (subject) {
      this.subjectSelected = subject
    },
    miliseconds (h, m) {
      if (m < 10) {
        m = `0${m}`
      }

      let today = new Date()
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = today.getFullYear()
      today = mm + '/' + dd + '/' + yyyy + ' ' + h + ':' + m
      let date = new Date(today)
      return date.getTime()
    },
    padTo2Digits (num) {
      return num.toString().padStart(2, '0')
    },

    convertMsToHM (milliseconds) {
      let seconds = Math.floor(milliseconds / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)

      seconds = seconds % 60
      minutes = seconds >= 30 ? minutes + 1 : minutes

      minutes = minutes % 60
      hours = hours % 24
      this.currentTime = this.padTo2Digits(hours)
      this.currentMinute = minutes
    },
    duration (hrs, min) {
      return ((hrs * 60 * 60 + min * 60) * 1000)
    },
    setAmPm (myDate = null) {
      let dateTime
      if (myDate == null) {
        dateTime = new Date()
      } else {
        let ms = parseInt(myDate)
        dateTime = new Date(ms)
      }
      this.currentHour = dateTime.getHours()
      if (dateTime.getHours() > 12) {
        this.ampm = 'PM'
      }
      this.currentMinuteInHour = dateTime.getMinutes()
    }
  },
  mounted () {
    this.getSubject({}).then(() => {
      if (this.subjects.length) {
        this.subjectSelected = this.schedule.subjectId
        this.payload.scheduleDays = this.schedule.scheduleDays
        this.convertMsToHM(this.schedule.scheduleDuration)
        this.setAmPm(this.schedule.scheduleTime)
      }
    })
  }
}
</script>
<style>
.date span {
  width: 100% !important;
}

.date span input {
  width: 100% !important;
  outline-style: none;
  border-radius: 5px;
}
</style>
