<template>
  <div class="bg-forest h-full overflow-y-scroll p-5">
    <div>
      <div v-if="loading" class="flex items-center justify-center h-screen w-full">
        <LoadingIndicator></LoadingIndicator>
      </div>
      <div v-else>
        <div v-if="users.length">
          <div class="grid grid-cols-3 gap-5">
            <div v-for="(user, index) in users" :key="index"
                 class="bg-white shadow rounded-md p-5 flex items-center justify-center relative">
              <div>
                <div class="h-20 w-20 rounded-full bg-forest flex items-center justify-center m-auto cursor-pointer"
                     :style="{backgroundImage:`url(${auth.user.photo}`}" @click="newUser(user.id)">
                  <div v-if="auth.user.photo == null">
                    <DefaultProfileIcon :size="55" fill="#fff"></DefaultProfileIcon>
                  </div>
                </div>
                <div class="text-center capitalize mt-3 cursor-pointer">
                  {{ user.first_name }} {{ user.last_name }} <span v-if="user.isMain">(គណនីមេ)</span>
                </div>
                <div class="absolute right-4 bottom-4" v-if="!user.isMain" @click="confirm(user.id)">
                  <button class="bg-danger text-white rounded-full h-7 w-14 text-sm cursor-pointer">
                    លុប
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-screen w-full flex items-center justify-center" v-else>
          <Empty></Empty>
        </div>
      </div>
    </div>
    <!-- Add -->
    <div class="fixed flex h-20 w-full left-0 bottom-0 items-center justify-end pr-5" v-if="auth.user.isMain && users.length <= 5 ">
      <div class="cursor-pointer" @click="()=>{this.isAdd = true}">
        <AddIcon fill="#174B7C" :size="30"></AddIcon>
      </div>
    </div>
    <!-- Add modal -->
    <template v-if="isAdd">
      <Add @closeAdd="()=>{this.isAdd = false}"></Add>
    </template>
    <!-- Confirm -->
    <template v-if="isConfirm">
      <Confirm @closeMessage="()=>{this.isConfirm = false}" @delete="deleteUser"></Confirm>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator'
import Empty from '@/components/Empty'
import AddIcon from '@/components/AddIcon'
import Add from './components/Add'
import DefaultProfileIcon from '@/components/DefaultProfileIcon'
import Confirm from '@/components/Message/Confirm'

export default {
  components: {
    LoadingIndicator,
    Empty,
    AddIcon,
    Add,
    DefaultProfileIcon,
    Confirm
  },
  data () {
    return {
      isAdd: false,
      id: null,
      isConfirm: false,
    }
  },
  computed: {
    ...mapState('user', ['loading', 'users']),
    ...mapState('auth', ['auth'])
  },
  methods: {
    ...mapActions('user', ['addNewStudent', 'removeStudent', 'switchStudent', 'getAllAccount']),
    confirm (id) {
      this.id = id
      this.isConfirm = true
    },
    deleteUser () {
      this.removeStudent(this.id).then(()=>{
        this.isConfirm = false
      })
    },
    newUser(id){
      this.switchStudent(id).then(res =>{
        this.$store.commit("auth/getToken",res.access_token)
        this.$store.commit("auth/receivedAuth",res)
        localStorage.setItem("token",res.access_token)
        localStorage.setItem("auth", JSON.stringify(res))
        this.$router.push({name: "Home"})
      })
    }
  },
  mounted () {
    this.getAllAccount()
  }
}
</script>

<style scoped>

</style>
