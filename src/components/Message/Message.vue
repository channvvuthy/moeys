<template>
  <div class="flex items-center justify-center z-50 fixed w-full h-full left-0 top-0 bg-black bg-opacity-90">
    <div class="bg-white shadow relative w-56 rounded-lg">
      <div class="w-6 h-6 rounded-full bg-forest shadow flex items-center justify-center absolute
      -top-3 -right-3 cursor-pointer" @click="()=>{this.$emit('closeMessage')}">
        <CloseIcon :width="20" ></CloseIcon>
      </div>
      <div class="flex justify-center items-center py-5 px-3 text-center">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '../../components/CloseIcon.vue'
export default {
  name: 'Message',
  components: {
    CloseIcon
  },
  props:{
    message:{
      default:function (){
        return ''
      }
    }
  }
}
</script>
