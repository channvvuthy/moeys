<template>
    <div class="h-full font-mono">
        <div class="flex flex-col items-center justify-center" v-if="loading" :style="{height:`${screenHeight}px`}">
            <div>
                <LoadingIndicator></LoadingIndicator>
            </div>
        </div>
        <div v-else>
            <div class="flex p-5">
                <div class="left">
                    <div :class="isAll?`hidden`:``">
                        <div v-if="isNext" class="flex items-center justify-center" style="min-height:360px;">
                            <LoadingIndicator></LoadingIndicator>
                        </div>
                        <template v-else>
                            <Media :videos="videos[`videoInfo`][`video`]" @onEnded="onEnded"></Media>
                        </template>
                    </div>
                    <div class="mt-5 border-b pb-3">
                        <div class="text-lg flex justify-between items-center">
                            <div>
                                <div>
                                    {{ videos.videoInfo.lessonTitle }} {{ videos.videoInfo.lessonIsPart }}
                                </div>

                            </div>
                            <div class="flex items-center">
                                <div class="text-sm text-gray-500 font-thin">
                                    ចំនួនអ្នកទស្សនា {{ videos.videoInfo.views }} នាក់
                                </div>
                                <div class="cursor-pointer ml-4">
                                    <PdfIcon :size="20" fill="#6b7280"></PdfIcon>
                                </div>
                                <div class="cursor-pointer mx-4">
                                  <template v-if="videos.videoInfo.isFavorite">
                                    <div @click="deleteFavorite(videos.videoInfo.markId)">
                                      <FavoritedIcon :size="22"></FavoritedIcon>
                                    </div>
                                  </template>
                                  <template v-else>
                                    <div @click="addFavorite(videos.videoInfo.vId)">
                                      <FavoriteIcon :size="22" fill="#6b7280"></FavoriteIcon>
                                    </div>
                                  </template>
                                </div>
                                <div class="cursor-pointer flex items-center justify-center">
                                    <template v-if="!isDownload">
                                        <div @click="selectQuality">
                                            <DownloadIcon :size="22" fill="#6b7280"></DownloadIcon>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <Loading></Loading>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex mt-5 items-center">
                        <div>
                            <div class="w-14 h-14 rounded-full bg-profile flex items-center justify-center">
                                <DefaultProfileIcon :size="35" fill="#FFF"></DefaultProfileIcon>
                            </div>
                        </div>
                        <div class="w-full mx-3">
                            <textarea class="w-full border rounded-full outline-none text-sm px-4 h-12 py-3" v-model="comment" placeholder="បញ្ចេញមតិ" v-on:keyup.enter="addComment"></textarea>
                        </div>
                        <div class="cursor-pointer">
                            <input type="file" name="comment_photo" id="comment_photo" ref="comment_photo" class="hidden"
                            accept="image/gif, image/jpeg, image/png"
                            @change="selectedPhoto">
                            <div @click="choosePhoto">
                                <ImageIcon :size="40" fill="#bababa"></ImageIcon>
                            </div>
                        </div>
                    </div>
                    <!-- List of comment -->
                    <ul class="mt-5 overflow-y-scroll relative" ref="comment" @scroll="onScroll" :class="isAll?`h-screen pb-60`:`md:h-56 2xl:h-96 pb-20`">
                        <div v-if="loadingComment" class="flex items-center justify-center">
                            <LoadingIndicator></LoadingIndicator>
                        </div>
                        <template v-else>
                            <li v-for="(comment, index) in comments.data" :key="index" class="mb-5">
                               <div class="flex">
                                   <div>
                                       <div class="w-14 h-14 rounded-full bg-profile flex items-center justify-center bg-cover bg-center" :style="{backgroundImage:`url(${comment.photo})`}">
                                          <template v-if="!comment.photo">
                                               <DefaultProfileIcon :size="35" fill="#FFF"></DefaultProfileIcon>
                                          </template>
                                    </div>
                                   </div>
                                    <div class="ml-3 w-full">
                                        <div class="font-semibold flex items-center capitalize">
                                            <div>
                                                {{ comment.username }}
                                            </div>
                                            <div class="ml-2 text-xs text-gray-400 font-thin">
                                                <timeago :datetime="comment.cmt_date"></timeago>
                                            </div>
                                        </div>
                                        <div class="text-xs mt-1">
                                            <div>{{ comment.comment }}</div>
                                            <div class="w-32" v-if="comment.comments_photo">
                                                <img src="http://188.166.229.123:3002/uploads/students/comments/202112/1640833784625e3mdi2qaw.jpeg" class="cursor-pointer">
                                            </div>
                                        </div>
                                        <div class="flex items-center xs text-gray-500 mt-2 cursor-pointer">
                                            <div class="flex items-center justify-end" @click="showReply(comment)">
                                                <ForumIcon :size="18" fill="#6b7280"></ForumIcon>
                                                <div class="ml-1">
                                                    {{comment.sub_cmt_count}} មតិយោបល់
                                                </div>
                                            </div>
                                            <div class="flex items-center justify-end ml-5" @click="showReply(comment)">
                                                <ReplyIcon :size="18" fill="#6b7280"></ReplyIcon>
                                                <div class="ml-1">
                                                    ឆ្លើយតប
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                               </div>
                            </li>
                            <li class="flex justify-end">
                                <div class="bg-primary rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" @click="scrollToTop">
                                    <ScrollTop :size="20" fill="#FFF"></ScrollTop>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="right pl-2">
                    <div class="font-mono font-semibold text-black">
                       <div>
                          <ul class="flex items-center h-11 text-sm border-b-4 border-primary">
                              <li class="w-32 relative tab text-white cursor-pointer h-full flex items-center justify-center bg-primary">មេរៀនបន្ទាប់</li>

                          </ul>
                        </div>
                        <ul class="mt-3 overflow-y-scroll pb-10 border" :style="{height:`${screenHeight}px`}">
                            <li v-for="(video, index) in videos.videoList" :key="index" class="p-3 hover:bg-forest" :class="videos.videoInfo.lessonId == video.lessonId?`bg-forest`:``">
                                <div class="flex">
                                    <div class="mr-3 cursor-pointer" @click="nextVideo">
                                        <img :src="video.lessonThumbnail" class="w-24">
                                    </div>
                                    <div class="text-sm">
                                        <div class="text-black cursor-pointer" @click="nextVideo">{{ video.lessonTitle }}</div>
                                        <div class="flex">
                                            <div class="xs mt-1 text-gray-500 font-thin">
                                                {{ video.lessonIsPart }}
                                            </div>
                                            <div class="xs mt-1 text-gray-500 ml-2">
                                                រយៈពេល {{ video.lessonDuration  }}នាទី
                                            </div>
                                        </div>
                                        <div class="mt-2 flex">
                                            <div class="cursor-pointer">
<!--                                                <FavoriteIcon :size="14" fill="#6b7280"></FavoriteIcon>-->
                                              {{video.views}}
                                            </div>
<!--                                            <div class="mx-3 cursor-pointer">-->
<!--                                                <DownloadIcon :size="14" fill="#6b7280"></DownloadIcon>-->
<!--                                            </div>-->
                                        </div>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Select quality -->
        <template v-if="isQty">
            <Quality @closeQty="()=>{this.isQty = false}" @selectQuality="selectedQuality($event)"></Quality>
        </template>
        <!-- Comment photo preview -->
        <div class="fixed w-full h-full left-0 top-0 flex items-center justify-center z-50 bg-black bg-opacity-80 text-sm" v-if="isComment">
            <div class="bg-white shadow rounded-xl w-96">
                <div class="flex h-12 items-center justify-between px-3 border-b relative">
                    <div class="font-black">
                        ពិនិត្យមើលរូបភាព
                    </div>
                    <div class="cursor-pointer absolute -right-2 -top-4 w-7 h-7 bg-forest shadow flex items-center justify-center rounded-full" @click="()=>{this.isComment = false; this.comment = null}">
                        <CloseIcon></CloseIcon>
                    </div>
                </div>
                <div class="">
                    <div class="mb-4">
                        <img :src="photo" class="m-auto"/>
                    </div>
                    <div class="px-3 mb-4 flex items-center">
                        <input type="text" v-model="comment" class="w-full h-10 px-3 border outline-none rounded-l-full" placeholder="បញ្ចេញមតិ">
                        <div class="relative bg-primary text-white px-5 h-10 flex items-center rounded-r-full cursor-pointer flex items-center" @click="addComment">
                            <template v-if="!commenting">
                                បញ្ជូន
                            </template>
                            <div v-else class="w-10">
                                <div class="absolute left-0 top-1">
                                    <LoadingIndicator :bg="false"></LoadingIndicator>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- Reply -->
        <template v-if="isReply">
            <Reply :comment="parentComment" @closeisReply="()=>{this.isReply = false}"></Reply>
        </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import LoadingIndicator from './../../components/LoadingIndicator.vue'
import Media from './../../components/Video/Media.vue'
import FavoriteIcon from './../../components/FavoriteIcon.vue'
import FavoritedIcon from './../../components/FavoritedIcon.vue'
import DownloadIcon from './../../components/DownloadIcon.vue'
import CommentIcon from './../../components/CommentIcon.vue'
import FileIcon from './../../components/FileIcon.vue'
import ImageIcon from './../../components/ImageIcon.vue'
import ForumIcon from './../../components/ForumIcon.vue'
import ReplyIcon from './../../components/ReplyIcon.vue'
import ScrollTop from '../../components/ScrollTop.vue'
import PdfIcon from '../../components/PdfIcon.vue'
import DefaultProfileIcon from './../../components/DefaultProfileIcon.vue'
import CloseIcon from './../../components/CloseIcon.vue'
import Quality from './components/Quality.vue'
import Loading from './components/Loading.vue'
import Reply from './components/Reply.vue'
import Vue from 'vue'
import VueTimeago from 'vue-timeago'
const { ipcRenderer } = require('electron')
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    en: require('date-fns/locale/en')
  }
})
export default {
  components: {
    LoadingIndicator,
    FavoriteIcon,
    Media,
    DownloadIcon,
    // eslint-disable-next-line vue/no-unused-components
    CommentIcon,
    // eslint-disable-next-line vue/no-unused-components
    FileIcon,
    ImageIcon,
    DefaultProfileIcon,
    ForumIcon,
    ReplyIcon,
    ScrollTop,
    PdfIcon,
    Loading,
    Quality,
    CloseIcon,
    Reply,
    FavoritedIcon
  },
  data () {
    return {
      page: 1,
      per_page: 50,
      loadingComment: false,
      isAll: false,
      isScrollAble: true,
      less_id: null,
      isDownload: false,
      isQty: false,
      comment: '',
      comment_photo: '',
      isComment: false,
      photo: null,
      commenting: false,
      isReply: false,
      parentComment: '',
      isFavorite: ''

    }
  },
  computed: {
    ...mapState('video', ['videos', 'loading', 'isNext']),
    ...mapState('layout', ['screenHeight']),
    ...mapState('comment', ['comments']),
    ...mapState('auth', ['auth'])

  },
  methods: {
    ...mapActions('video', ['getVideo', 'getNextVideo']),
    ...mapActions('comment', ['getComment', 'postComment']),
    ...mapActions('favorite', ['favorite', 'removeFavorite']),

    selectedQuality (qty) {
      this.isQty = false
      this.isDownload = true
      // eslint-disable-next-line eqeqeq
      this.videos.videoInfo.fileUrl = this.videos.videoInfo.video.filter(item => item.quality == qty).map(item => item.url)[0]
      ipcRenderer.send('download', this.videos.videoInfo)
    },
    scrollToTop () {
      this.$refs.comment.scrollTop = 0
      this.isAll = false
    },
    onEnded () {
      this.nextVideo()
    },
    selectQuality () {
      this.isQty = true
    },
    showReply (comment) {
      this.$store.commit('comment/getLessonId', this.less_id)
      this.parentComment = comment
      this.isReply = true
    },
    nextVideo () {
      const index = parseInt(this.videos.videoInfo.lessonIsSort) + 1
      if (index < this.videos.videoList.length) {
        // eslint-disable-next-line eqeqeq
        const lesson = this.videos.videoList.filter(item => item.lessonIsSort == index)[0]
        this.getNextVideo(lesson.vId)
        this.less_id = lesson.lessonId

        this.getComment({
          less_id: this.less_id,
          page: this.page,
          per_page: this.per_page
        }).then(() => {
          this.loadingComment = false
        })
      }
    },
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      // eslint-disable-next-line eqeqeq
      if (scrollTop == 0) {
        this.isAll = false
      }
      if (scrollTop + clientHeight >= scrollHeight) {
        this.isAll = true
        this.page++

        this.getComment({
          less_id: this.less_id,
          page: this.page,
          per_page: this.per_page
        })
      }
    },
    choosePhoto () {
      this.$refs.comment_photo.click()
    },
    getBase64 (file) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.comment_photo = reader.result
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
    selectedPhoto (e) {
      const file = e.target.files[0]
      this.photo = URL.createObjectURL(file)
      this.getBase64(file)
      this.isComment = true
    },
    addComment () {
      this.commenting = true
      const payload = new FormData()
      this.$store.commit('comment/getLessonId', this.less_id)
      payload.append('less_id', this.less_id)
      payload.append('comment', this.comment)
      payload.append('comment_photo', this.comment_photo)
      this.postComment(payload).then(res => {
        const d = new Date()

        const newComment = {
          cmt_date: d.getTime(),
          cmt_id: res.data.cmt_id,
          cmt_post_date: d.getTime(),
          comment: this.comment,
          comments_photo: this.photo,
          comments_photo_name: null,
          comments_photo_small: null,
          first_name: this.auth.user.first_name,
          isEdit: false,
          isOwnComment: false,
          last_name: this.auth.user.last_name,
          photo: this.auth.user.photo,
          studentId: this.auth.user.id,
          sub_cmt_count: 0,
          username: this.auth.user.first_name + ' ' + this.auth.user.last_name
        }
        this.$store.commit('comment/postComment', newComment)
        this.comment = null
        this.comment_photo = null
        this.isComment = false
        this.commenting = false
      })
    },
    addFavorite (vidId) {
      const payload = {}
      payload.b_type = 2
      payload.b_id = vidId
      this.favorite(payload).then((res) => {
        this.$store.commit('video/favorite', true)
        this.$store.commit('video/mark', res.data.markId)
      })
    },
    deleteFavorite (vidId) {
      this.removeFavorite(vidId).then(() => {
        this.$store.commit('video/favorite', false)
      })
    }
  },
  created () {
    const vidId = this.$route.params.vidId

    this.getVideo(vidId).then(() => {
      this.loadingComment = true
      this.less_id = this.videos.videoInfo.lessonId
      this.getComment({
        less_id: this.videos.videoInfo.lessonId,
        page: this.page,
        per_page: this.per_page
      }).then(() => {
        this.loadingComment = false
      })
    })
  },
  mounted () {
    ipcRenderer.on('downloaded', (event, args) => {
      console.log(args)
    })
  }
}
</script>
<style>
    .left{
        width: 69%;
        margin-right: 1%;
    }
    .right{
        width:30%;
    }
    .xs{
        font-size:10px;
    }
    .tab:after{
        content: "";
        position: absolute;
        right:-40px;
        border-color:#174B7C;
        border-width:20px;
        border-top-color: transparent;
        border-right-color: transparent;
    }
</style>
