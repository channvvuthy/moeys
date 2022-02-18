<template>
  <div class="flex items-center justify-center z-50 fixed w-full h-full left-0 top-0 bg-black bg-opacity-70">
    <div class="bg-white shadow relative w-72 rounded-lg">
      <div class="h-12 flex items-center px-5 border-b text-lg font-bold">
        បញ្ជាក់
      </div>
      <div class="w-6 h-6 rounded-full bg-forest shadow flex items-center justify-center absolute
      -top-3 -right-3 cursor-pointer" @click="()=>{this.$emit('closeMessage')}">
        <CloseIcon :width="20" ></CloseIcon>
      </div>
      <div class="flex justify-start items-center p-5">
        <div>
          <div class="text-left">
            {{message}}
          </div>
        </div>
      </div>
     <div class="px-5 flex justify-end items-center mb-5">
       <button @click="()=>{this.$emit('delete')}" class="text-danger rounded-md font-black">
         យល់ព្រម
       </button>
     </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '../../components/CloseIcon.vue'
import DeleteIcon from '@/components/DeleteIcon'
export default {
  name: 'Confirm',
  components: {
    CloseIcon,
    DeleteIcon
  },
  props:{
    message:{
      default:function (){
        return 'តើអ្នកពិតជាចង់លុបវាមែនទេ?'
      }
    }
  }
}
</script>
