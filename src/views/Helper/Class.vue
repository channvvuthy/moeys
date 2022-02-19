<template>
  <div class="fixed z-50 w-full h-full top-0 left-0 bg-black bg-opacity-90 flex items-center justify-center">
    <div class="text-white" v-if="loadingClass">
      <LoadingIndicator :bg="false"></LoadingIndicator>
    </div>
    <div v-else class="bg-white rounded-md shadow w-96 text-black text-sm">
      <div>
        <div class="text-base font-semibold w-full border-b h-12 flex items-center pl-5 justify-between">
          <div class="cursor-pointer" @click="back">
            <BackIcon></BackIcon>
          </div>
          <div class="text-center w-full">ថ្នាក់ទី</div>
        </div>
        <ul class="overflow-y-scroll pb-5" style="max-height: 32rem;" id="feed">
          <li v-for="(cl, index) in classes" :key="index" class="py-3 cursor-pointer border-b px-5"
              @click="selectedClass(cl)">
            {{ cl.title }}
          </li>
          <div class="flex justify-start items-center mt-5 text-sm pl-5" :class="showType?`visible`:`invisible`">
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
          <div class="flex justify-end px-5 mt-5" @click="filter" :class="showType?`visible`:`invisible`">
            <button class="bg-primary text-white rounded-md font-bold h-10 w-20">
              ច្រោះ
            </button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import LoadingIndicator from './../../components/LoadingIndicator.vue'
import BackIcon from './../../components/BackIcon.vue'

export default {
  components: {
    LoadingIndicator,
    BackIcon

  },
  computed: {
    ...mapState('helper', ['loadingClass', 'classes'])
  },
  data () {
    return {
      showType: false,
      cl: {},
      payload: {
        type_id: 1,
      }
    }
  },
  methods: {
    ...mapActions('helper', ['getClasses']),
    ...mapState('auth', ['auth']),
    back () {
      this.$emit('back')
    },
    filter () {
      this.cl.study_type = this.payload.type_id
      this.$emit('selectedClass', this.cl)
    },
    selectedClass (cl) {
      if (cl.class_id >= 10 && cl.class_id <= 12) {
        this.showType = true
        this.cl = cl
        let feed = this.$el.querySelector('#feed')
        feed.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })
        return
      }
      this.$emit('selectedClass', cl)
    }
  },
  mounted () {
    this.getClasses()
  },
}
</script>
