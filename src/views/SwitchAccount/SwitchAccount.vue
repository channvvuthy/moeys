<template>
  <div class="bg-forest h-full overflow-y-scroll">
    <div>
      <div v-if="loading" class="flex items-center justify-center h-screen w-full">
        <LoadingIndicator></LoadingIndicator>
      </div>
      <div v-else>
        <div v-if="users.length">
          <div class="grid grid-cols-3 gap-5">
            <div v-for="(user, index) in users" :key="index">
              <div>
                {{ user }}
              </div>
            </div>
          </div>
        </div>
        <div class="h-screen w-full flex items-center justify-center">
          <Empty></Empty>
        </div>
      </div>
    </div>
    <!-- Add -->
    <div class="fixed flex h-20 w-full left-0 bottom-0 items-center justify-end pr-5">
      <div class="cursor-pointer" @click="()=>{this.isAdd = true}">
        <AddIcon fill="#174B7C" :size="30"></AddIcon>
      </div>
    </div>
    <!-- Add modal -->
    <template v-if="isAdd">
      <Add @closeAdd="()=>{this.isAdd = false}"></Add>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import Empty from '@/components/Empty'
import AddIcon from '@/components/AddIcon'
import Add from './components/Add'

export default {
  components: {
    LoadingIndicator,
    Empty,
    AddIcon,
    Add
  },
  data () {
    return {
      isAdd: false,
    }
  },
  computed: {
    ...mapState('user', ['loading', 'users']),
  },
  methods: {
    ...mapActions('user', ['addNewStudent', 'removeStudent', 'switchStudent', 'getAllAccount'])
  },
  mounted () {
    this.getAllAccount()
  }
}
</script>

<style scoped>

</style>
