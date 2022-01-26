<template>
    <div class="fixed items-center flex justify-center bg-black bg-opacity-80 left-0 top-0 w-full h-full">
        <div class="w-100 bg-white rounded-xl shadow">
            <div class="flex items-center justify-between px-3 py-3 relative border-b">
                <div class="w-full text-center">មតិយោបល់</div>
                <div class="bg-forest rounded-full w-7 h-7 flex items-center justify-center absolute -right-2 -top-4 shadow cursor-pointer" @click="()=>{this.$emit('closeisReply')}">
                    <div>
                        <CloseIcon></CloseIcon>
                    </div>
                </div>
            </div>
            <ul>
                <li class="flex  py-2 px-3 mb-3 bg-gray-100 justify-between border-b">
                    <div class="flex">
                        <div>
                            <div class="h-14 w-14 bg-forest rounded-full flex items-center justify-center bg-cover w-14 h-14 rounded-full" :style="{backgroundImage:`url(${comment.photo})`}">
                                <template v-if="!comment.photo">
                                    <DefaultProfileIcon :size="35" fill="#FFF"></DefaultProfileIcon>
                                </template>
                            </div>
                        </div>
                        <div class="ml-3">
                            <div class="capitalize">
                               {{ comment.username }}
                            </div>
                            <div class="text-sm font-extralight text-gray-600">
                                {{ comment.comment }}
                            </div>
                            <div class="text-sm w-32" v-if="comment.comments_photo">
                               <img :src="comment.comments_photo">
                            </div>
                        </div>
                    </div>
                    <div class="ml-2 text-xs text-gray-400 font-thin whitespace-nowrap">
                        <timeago :datetime="comment.cmt_date"></timeago>
                    </div>
                </li>
            </ul>
            <div class="h-96 flex flex-col justify-between">
                <ul class="h-96 overflow-y-scroll" ref="sub">
                    <li v-for="(comment,index) in comments" :key="index" class="px-3 mb-3 justify-between flex pb-3" :class="index < (comments.length - 1)?`border-b`:``">

                        <div class="flex">
                            <div>
                                <div class="h-14 w-14 bg-forest rounded-full flex items-center justify-center" :style="{backgroundImage:`url(${comment.photo})`}">
                                    <template v-if="!comment.photo">
                                        <DefaultProfileIcon :size="35" fill="#FFF"></DefaultProfileIcon>
                                    </template>
                                </div>
                            </div>
                            <div class="ml-3">
                                <div class="capitalize">
                                {{ comment.username }}
                                </div>
                                <div class="text-sm">
                                    {{ comment.comment }}
                                </div>
                                <div class="text-sm w-32" v-if="comment.comments_photo">
                                  <img :src="comment.comments_photo">
                                </div>
                            </div>
                        </div>
                        <div class="ml-2 text-xs text-gray-400 font-thin whitespace-nowrap">
                            <timeago :datetime="comment.cmt_date"></timeago>
                        </div>
                    </li>
                </ul>
                <div class="flex items-center px-3 mb-3 relative">
                  <div class="flex items-center justify-center absolute right-20 top-1" v-if="loading">
                    <LoadingIndicator></LoadingIndicator>
                  </div>
                    <textarea class="border w-full h-10 rounded-full text-sm px-3 outline-none py-2"
                              :disabled="loading"
                              v-on:keyup.enter="reply"
                              style="resize: none;" placeholder="បញ្ចេញមតិ" v-model="text"></textarea>
                    <div class="ml-3 cursor-pointer">
                      <input type="file" name="comment_photo"
                             :disabled="loading"
                             accept="image/gif, image/jpeg, image/png"
                             @change="selectedPhoto"
                             id="comment_photo" ref="comment_photo" class="hidden">
                        <div @click="()=>{this.$refs.comment_photo.click()}">
                          <ImageIcon :size="40" fill="#bababa"></ImageIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CloseIcon from './../../../components/CloseIcon.vue'
import DefaultProfileIcon from './../../../components/DefaultProfileIcon.vue'
import ImageIcon from './../../../components/ImageIcon.vue'
import { mapActions } from 'vuex'
import LoadingIndicator from './../../../components/LoadingIndicator.vue'
import Vue from 'vue'
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    en: require('date-fns/locale/en')
  }
})
export default {
  props: {
    comment: {}
  },
  data () {
    return {
      comments: [],
      text: '',
      comment_photo: '',
      loading: false
    }
  },
  components: {
    CloseIcon,
    DefaultProfileIcon,
    ImageIcon,
    LoadingIndicator
  },
  methods: {
    ...mapActions('comment', ['getSubComment', 'replyComment']),
    selectedPhoto (e) {
      const file = e.target.files[0]
      this.getBase64(file)
    },
    getBase64 (file) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.comment_photo = reader.result
        this.reply()
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
    reply: function () {
      this.$store.commit('comment/getCommentId', this.comment.cmt_id)
      const payload = new FormData()
      payload.append('comment', this.text)
      payload.append('comment_photo', this.comment_photo)
      // eslint-disable-next-line eqeqeq
      if (this.text.trim() == '' && this.comment_photo == '') {
        return false
      }
      this.loading = true
      this.replyComment(payload).then(res => {
        this.text = ''
        this.comment_photo = ''
        this.loading = false
        this.getSub()
      }).then(() => {
        this.$refs.sub.scrollTop = this.$refs.sub.clientHeight + this.$refs.sub.scrollHeight
      })
    },
    getSub: function () {
      this.getSubComment(this.comment.cmt_id).then(res => {
        this.comments = res.data.data
      })
    }
  },
  created () {
    this.getSub()
  }
}
</script>
