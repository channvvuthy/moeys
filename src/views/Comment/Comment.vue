<template>
<div class="main h-screen">
  <div class="darker relative overflow-hidden h-full z-40">
    <div class="flex items-center justify-center  w-full h-full left-0 top-0">
      <div class="bg-white rounded-xl shadow p-5" style="width: 32rem;">
        <div class="text-lg font-black">
          បញ្ចេញមតិដើម្បីជួយជម្រុញកម្មវិធីនេះឲ្យកាន់តែប្រសើរឡើង
        </div>
        <div>
          <textarea style="resize: none" class="border-2 w-full h-40 outline-none rounded-md p-3 mt-5"
                    v-model="content_text"
                    maxlength="200"
          placeholder="មតិរបស់អ្នក..."
          ></textarea>
        </div>
        <div class="flex justify-end text-gray-500">
          <span class="text">{{content_text.length}}</span>
          <span>/</span>
          <span class="limit">200</span>
        </div>
        <div>
          <button
            @click="postFeedback"
            class="w-full flex items-center justify-center h-10 mt-5 rounded-md bg-primary text-white relative"
            :disabled="(loading || content_text.length === 0)"
          >
          <div class="text-white absolute top-1" v-if="loading">
            <loadingIndicator :bg="false"></loadingIndicator>
          </div>
            <div v-else>
              រួចរាល់
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import loadingIndicator from '@/components/LoadingIndicator'
import helper from '@/helper'

export default {
  components:{
    loadingIndicator
  },
  data(){
   return{
     content_text: "",
   }
  },
  computed:{
   ...mapState('feedback', ['loading'])
  },
  methods:{
    ...mapActions('feedback', ['feedback']),
    postFeedback(){
      let payload = {
        content_text: this.content_text
      }
      this.feedback(payload).then(()=>{
        this.content_text = ""
        helper.success("មតិយោបល់ត្រូវបានធ្វើរួចរាល់")
      })
    }
  }
}
</script>

<style>
.main {
  background: #eee;
}

.darker:after {
  content: ' ';
  border-top: 100vh solid #dcd9d9;
  border-left: 100vw solid transparent;
  width: 0;
  left: 0;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
