<template>
  <div>
    <img src="/assets/undraw_no_data.svg" alt="NO DATA TO BE FOUND" class="w-40">
    <div class="text-center text-lg font-black mt-2">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props:{
    title:{
      default:()=>{
        return "ពុំមានទិន្នន័យ"
      }
    }
  }
}
</script>

<style scoped>

</style>
