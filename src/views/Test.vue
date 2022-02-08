<template>
<div>
  <input type="file" name="file" id="file" @change="chooseFile">
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Test',
  data(){
    return{
      file: ""
    }
  },
  methods:{
    chooseFile(e){
      var file = e.target.files[0]
      let formData = new FormData();
      formData.append("video", file)
      formData.append("action_type","social")
      axios.post("http://192.168.11.48:3200/v5.1/upload-video", formData).then(res =>{
        console.log(res)
      })
    }
  }

}
</script>

<style scoped>

</style>
