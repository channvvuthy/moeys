<template>
  <div class="flex items-center justify-center z-50 fixed w-full h-full left-0 top-0 bg-black bg-opacity-90">
    <div class="bg-white shadow relative w-56 rounded-lg">
      <div class="w-6 h-6 rounded-full bg-forest shadow flex items-center justify-center absolute
      -top-3 -right-3 cursor-pointer" @click="()=>{this.$emit('closeMessage')}">
        <CloseIcon :width="20" ></CloseIcon>
      </div>
      <div class="flex justify-center items-center pt-5 py-4">
        <div>
          <div>
            {{message}}
          </div>
          <div class="flex justify-end items-center">
            <div class="py-1 text-white text-sm mt-5 cursor-pointer" @click="()=>{this.$emit('delete')}">
              <DeleteIcon :size="20"></DeleteIcon>
            </div>
          </div>
        </div>
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
