<template>
<div class="main h-screen">
  <div class="darker relative overflow-hidden h-full z-50">
    <div class="flex items-center justify-center  w-full h-full left-0 top-0">
      <div class="bg-white rounded-xl shadow w-100 p-5">
        <div class="text-lg font-black">
          បញ្ចេញមតិដើម្បីជួយជម្រុញកម្មវិធីនេះឲ្យកាន់តែប្រសើរឡើង
        </div>
        <div>
          <textarea style="resize: none" class="border-2 w-full h-40 outline-none rounded-md p-3 mt-5"
                    v-model="comment"
                    maxlength="200"
          placeholder="មតិរបស់អ្នក..."
          ></textarea>
        </div>
        <div class="flex justify-end text-gray-500">
          <span class="text">{{comment.length}}</span>
          <span>/</span>
          <span class="limit">200</span>
        </div>
        <div>
          <button
            class="w-full flex items-center justify-center h-10 mt-5 rounded-md bg-primary text-white"
            :disabled="(comment.length == 0 || comment.length >= 200)"
          >រួចរាល់</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
 data(){
   return{
     comment: "",
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
