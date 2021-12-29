<template>
    <div class="fixed w-full h-full flex items-center justify-between flex-col z-50 login py-10">
        <div class="absolute left-2 top-4 cursor-pointer">
            <div class="flex items-center" @click="() =>{this.$emit('back')}">
                <BackIcon fill="#FFF"></BackIcon>
            </div>
        </div>
        <div class="absolute right-4 top-4 cursor-pointer">
            <div class="flex items-center text-sm" @click="()=>{this.$router.push({name:'Help'})}">
                ជំនួយ
            </div>
        </div>
        <div class="text-center">
            <img src="/logo/Moeys.png" class="w-32" />
            <p class="mt-2 text-sm">កម្មវិធី</p>
            <p class="font-bold text-2xl mt-2">ស្វ័យសិក្សា</p>
        </div>
        <!-- Register step one -->
        <div class="w-99 p-5" v-if="!stepTwo">
            <p class="mb-5 text-xl">បង្កើតគណនីថ្មី</p>
            <input type="text" ref="firstName" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none" placeholder="នាមត្រកូល" v-model="user.first_name" />
            <div class="mb-5"></div>
            <input type="text" v-model="user.last_name" ref="lastName" class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none" placeholder="នាមខ្លួន" />
            <div class="mb-5"></div>
            <div class="flex items-center">
                <label class="text-sm flex items-center mr-5">
                    <input type="radio" name="gender" class="hidden" v-model="user.gender" value="1" />
                    <div class="h-4 w-4 border border-white rounded-full mr-2 flex items-center justify-center">
                        <div class="bg-white h-2 w-2 bg-white rounded-full" v-if="user.gender == '1'"></div>
                    </div>
                    ប្រុស
                </label>
                <label class="text-sm flex items-center">
                    <input type="radio" name="gender" class="hidden" v-model="user.gender" value="0" />
                    <div class="h-4 w-4 border border-white rounded-full mr-2 flex items-center justify-center">
                        <div class="bg-white h-2 w-2 bg-white rounded-full" v-if="user.gender == '0'"></div>
                    </div>
                    ស្រី
                </label>
            </div>
            <div class="mb-5"></div>
            <div class="relative">
                <input
                    type="text"
                    ref="phone"
                    v-model="user.phone"
                    class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
                    placeholder="លេខទូរស័ព្ទ (012345678)"
                    @keypress="isNumber($event)"
                />
            </div>
            <div class="mb-5"></div>
            <div class="relative">
                <input
                    :type="isShowPassword?`text`:`password`"
                    ref="password"
                    v-model="user.password"
                    class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
                    placeholder="ពាក្យសម្ងាត់(6 ខ្ទង់យ៉ាងតិច)"
                />
                <div class="absolute right-4 top-2 cursor-pointer" @click="showPassword">
                    <EyeIcon fill="#FFF" v-if="!isShowPassword"></EyeIcon>
                    <InvisibleIcon fill="#FFF" v-else></InvisibleIcon>
                </div>
            </div>
            <div class="mb-5"></div>
            <div class="relative">
                <input
                    :type="isShowConfirmPassword?`text`:`password`"
                    v-model="user.confirm_password"
                    ref="confirmPassword"
                    class="h-10 w-full rounded-full bg-transparent border border-white px-3 text-sm placeholder-white outline-none"
                    placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់(6 ខ្ទង់យ៉ាងតិច)"
                />
                <div class="absolute right-4 top-2 cursor-pointer" @click="showConfirmPassword">
                    <EyeIcon fill="#FFF" v-if="!isShowConfirmPassword"></EyeIcon>
                    <InvisibleIcon fill="#FFF" v-else></InvisibleIcon>
                </div>
            </div>
            <div class="flex items-center text-xs mt-5 cursor-pointer">
                <div class="h-4 w-4 border border-white rounded-full mr-2 flex items-center justify-center">
                    <div class="bg-white h-2 w-2 bg-white rounded-full" v-if="user.term"></div>
                </div>
                <p @click="()=>{this.isTerm = true}">
                    តើអ្នកយល់ព្រមជាមួយ <label><input type="checkbox" v-model="user.term" class="hidden" /><span class="text-secondary cursor-pointer">លក្ខខ័ណ្ណ </span> </label>នឹងការបង្កើតនិងប្រើប្រាស់គណនី?
                </p>
            </div>
            <button class="relative rounded-full bg-white text-primary w-full h-10 mt-5 flex items-center justify-center" @click="createAccount">
                <div class="absolute -top-3" v-if="loading">
                    <LoaderIcon></LoaderIcon>
                </div>
                <div v-else>
                    យល់ព្រម
                </div>
            </button>
        </div>
        <!-- Register step twow -->
        <div class="w-99 p-5 text-sm" v-else>
            <p class="mb-5 text-xl">បំពេញព័ត៍មានគណនី</p>
            <div class="flex items-center">
                <label class="flex items-center">
                    <input type="radio" name="type" v-model="registerNextStep.type_id" value="1" class="hidden">
                    <div class="h-4 w-4 border border-white rounded-full mr-2 flex items-center justify-center">
                        <div class="bg-white h-2 w-2 bg-white rounded-full" v-if="registerNextStep.type_id == 1"></div>
                    </div>
                    <div>
                        <div>ខ្ញុំជាសិស្ស</div>
                    </div>
                </label>
                <div class="w-10"></div>
                <label class="flex items-center">
                    <input type="radio" name="type" v-model="registerNextStep.type_id" value="0" class="hidden">
                    <div class="h-4 w-4 border border-white rounded-full mr-2 flex items-center justify-center">
                        <div class="bg-white h-2 w-2 bg-white rounded-full" v-if="registerNextStep.type_id == 0"></div>
                    </div>
                    <div>
                        <div>ខ្ញុំជាគ្រូ</div>
                    </div>
                </label>
            </div>
            <div class="relative">
                <input type="date" ref="dob" v-model="registerNextStep.dob" id="calendar" class="mt-5 w-full h-10 rounded-full outline-none px-5 border border-white bg-transparent text-white">
            </div>
            <div class="mt-5">
                <div class="h-10 w-full rounded-full border border-white flex items-center px-5 justify-between"  @click="()=>{this.isProvince = true}">
                    <div>
                        {{registerNextStep.pro_name?registerNextStep.pro_name:`រាជធានី/ខេត្ត`}}
                    </div>
                    <div class="cursor-pointer">
                        <ArrowDownIcon fill="#fff" :size="20"></ArrowDownIcon>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <div class="h-10 w-full rounded-full border border-white flex items-center px-5 justify-between" @click="()=>{this.isSchool = true}">
                    <div>
                        {{registerNextStep.school_id?registerNextStep.school_id:`ឈ្មោះសាលា`}}
                    </div>
                    <div class="cursor-pointer">
                        <ArrowDownIcon fill="#fff" :size="20"></ArrowDownIcon>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <div class="h-10 w-full rounded-full border border-white flex items-center px-5 justify-between" @click="()=>{this.isClass = true}">
                    <div>
                        {{registerNextStep.class_name?registerNextStep.class_name:`ថ្នាក់ទី`}}
                    </div>
                    <div class="cursor-pointer">
                        <ArrowDownIcon fill="#fff" :size="20"></ArrowDownIcon>
                    </div>
                </div>
            </div>
            <button class="relative rounded-full bg-white text-primary font-semibold w-full h-10 mt-5 flex items-center justify-center" @click="nextStep">
                <div class="absolute -top-3" v-if="loading">
                    <LoaderIcon></LoaderIcon>
                </div>
                <div v-else>
                    យល់ព្រម
                </div>
            </button>
        </div>
        <template v-if="isTerm">
            <Term @back="back"></Term>
        </template>
        <template v-if="isProvince">
            <Province @back="closeProvince" @selectedProvince="selectedProvince($event)"></Province>
        </template>
        <template v-if="isSchool">
            <School @back="closeSchool" @selectedSchool="selectedSchool($event)" :province_id="registerNextStep.pro_id"></School>
        </template>
        <template v-if="isClass">
            <Class @back="closeClass" @selectedClass="selectedClass($event)"></Class>
        </template>
    </div>
</template>
<script>
import EyeIcon from "./../../../components/EyeIcon.vue"
import InvisibleIcon from "./../../../components/InvisibleIcon.vue"
import ArrowDownIcon from "./../../../components/ArrowDownIcon.vue"
import CalendarIcon from "./../../../components/CalendarIcon.vue"
import BackIcon from "./../../../components/BackIcon.vue"
import Term from "./Term.vue"
import helper from "./../../../helper/index"
import LoaderIcon from "./../../../components/LoaderIcon.vue"
import Province from "./../../Helper/Province.vue"
import School from "./../../Helper/School.vue"
import Class from "./../../Helper/Class.vue"
import { mapActions } from 'vuex'
export default {
    components:{
        CalendarIcon,
        EyeIcon,
        BackIcon,
        Term,
        InvisibleIcon,
        LoaderIcon,
        ArrowDownIcon,
        Province,
        School,
        Class
    },
    data(){
        return{
            loading: false,
            isTerm: false,
            isProvince: false,
            isSchool: false,
            isClass: false,
            isShowPassword: false,
            isShowConfirmPassword: false,
            stepTwo:false,
            
            user:{
                first_name: null,
                last_name: null,
                phone: null,
                password: null,
                confirm_password: null,
                gender: 1,
                term: false
            },
            registerNextStep:{
                pro_name: null,
                pro_id: null,
                type_id:1,
                class_id:null,
                class_name: null,
                dob: null,
                school_name:null,
                school_id: null,
                token: null,
            }
        }
    },
    methods:{
        ...mapActions('auth', ['registerStepOne','registerStepTwo']),
        selectedProvince(province){
            this.registerNextStep.pro_name = province.title
            this.registerNextStep.pro_id = province.id
            this.closeProvince()
        },
        selectedSchool(school){
            this.registerNextStep.school_name = school.id
            this.registerNextStep.school_id = school.school_name
            this.closeSchool()
        },
        selectedClass(cl){
            this.registerNextStep.class_id = cl.id
            this.registerNextStep.class_name = cl.title
            this.closeClass()
        },
        showPassword(){
            this.isShowPassword =! this.isShowPassword
        },
        showConfirmPassword(){
            this.isShowConfirmPassword =! this.isShowConfirmPassword
        },
        isNumber(evt){
            return helper.isNumber(evt)
        },
        back(){
            this.isTerm =! this.isTerm
        },
        closeProvince(){
            this.isProvince = false
        },
        closeSchool(){
            this.isSchool = false
        },
        closeClass(){
            this.isClass = false
        },
        createAccount(){
           if(!this.user.first_name){
                helper.error("សូមបញ្ចូលនាមត្រកូល")
                this.$refs.firstName.focus()
                return;
            }
            if(!this.user.last_name){
                helper.error("សូមបញ្ចូលនាមខ្លួ​ន")
                this.$refs.lastName.focus()
                return;
            }
            if(!this.user.phone){
                helper.error("សូមបញ្ចូលលេខទូរស័ព្ទ")
                this.$refs.phone.focus()
                return;
            }
            if(!this.user.password){
                helper.error("សូមបញ្ចូលពាក្យសម្ងាត់")
                this.$refs.password.focus()
                return;
            } 
            if(this.user.password.length < 6){
                helper.error("ពាក្យសម្ងាត់យ៉ាងតិច 6​ ខ្ទង់")
                this.$refs.password.focus()
                return;
            }
            if(!this.user.confirm_password){
                helper.error("សូមបញ្ចូលពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់")
                this.$refs.confirmPassword.focus()
                return;
            }
            if(this.user.confirm_password.length < 6){
                helper.error("ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់យ៉ាងតិច 6 ខ្ទង់")
                this.$refs.confirmPassword.focus()
                return;
            }
            if(this.user.password != this.user.confirm_password){
                helper.error("ពាក្យសម្ងាត់ផ្ទៀផ្ទាត់មិនត្រឹមត្រូ")
                this.$refs.confirmPassword.focus()
                return;
            }
            this.user.phone = `+855${this.user.phone}`
            
            this.registerStepOne(this.user).then(res=>{
                this.registerNextStep.token = res.access_token
                this.stepTwo = true
            }).catch(err =>{
                helper.error(err.response.data.message)
            })
        },
        nextStep(){
            if(!this.registerNextStep.dob){
                helper.error("សូមជ្រើសរើសថ្ងៃខែឆ្នាំកំណើត")
                return;
            }
            if(!this.registerNextStep.pro_id){
                helper.error("សូមជ្រើសរើសខេត្ត")
                return;
            }
            if(!this.registerNextStep.school_name){
                helper.error("សូមជ្រើសរើសសាលា")
                return;
            }
            if(!this.registerNextStep.class_id){
                helper.error("សូមជ្រើសរើសថ្នាក់")
                return;
            }
            this.loading = true
            this.registerNextStep['phone'] = this.user.phone
            this.registerNextStep.dob = helper.datToMilliseconds(this.registerNextStep.dob)
            this.registerStepTwo(this.registerNextStep).then(res =>{
                this.loading = false
                this.$store.commit("auth/receivedAuth",{user:res})
                this.$store.commit("auth/getToken", this.registerNextStep.token)
                localStorage.setItem("auth", JSON.stringify({user:res}))
                localStorage.setItem("token", this.registerNextStep.token)
            }).catch(err =>{
                helper.error(err.response.data.message)
            })
        }
    },
    
}
</script>
<style>
    input[type="date"]::-webkit-calendar-picker-indicator {
        /* display: none; */
        background-image: url('data:image/svg+xml;base64,IDxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogICAgICAgIDxnIGZpbGw9IiNmZmYiPgogICAgICAgICAgICA8Zz4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIzODYiIGN5PSIyMTAiIHI9IjIwIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNDMyLDQwaC0yNlYyMGMwLTExLjA0Ni04Ljk1NC0yMC0yMC0yMGMtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjB2MjBoLTkxVjIwYzAtMTEuMDQ2LTguOTU0LTIwLTIwLTIwCiAgICAgICAgICAgICAgICAgICAgICAgIGMtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjB2MjBoLTkwVjIwYzAtMTEuMDQ2LTguOTU0LTIwLTIwLTIwcy0yMCw4Ljk1NC0yMCwyMHYyMEg4MEMzNS44ODgsNDAsMCw3NS44ODgsMCwxMjB2MzEyCiAgICAgICAgICAgICAgICAgICAgICAgIGMwLDQ0LjExMiwzNS44ODgsODAsODAsODBoMTUzYzExLjA0NiwwLDIwLTguOTU0LDIwLTIwYzAtMTEuMDQ2LTguOTU0LTIwLTIwLTIwSDgwYy0yMi4wNTYsMC00MC0xNy45NDQtNDAtNDBWMTIwCiAgICAgICAgICAgICAgICAgICAgICAgIGMwLTIyLjA1NiwxNy45NDQtNDAsNDAtNDBoMjV2MjBjMCwxMS4wNDYsOC45NTQsMjAsMjAsMjBzMjAtOC45NTQsMjAtMjBWODBoOTB2MjBjMCwxMS4wNDYsOC45NTQsMjAsMjAsMjBzMjAtOC45NTQsMjAtMjBWODBoOTEKICAgICAgICAgICAgICAgICAgICAgICAgdjIwYzAsMTEuMDQ2LDguOTU0LDIwLDIwLDIwYzExLjA0NiwwLDIwLTguOTU0LDIwLTIwVjgwaDI2YzIyLjA1NiwwLDQwLDE3Ljk0NCw0MCw0MHYxMTRjMCwxMS4wNDYsOC45NTQsMjAsMjAsMjAKICAgICAgICAgICAgICAgICAgICAgICAgYzExLjA0NiwwLDIwLTguOTU0LDIwLTIwVjEyMEM1MTIsNzUuODg4LDQ3Ni4xMTIsNDAsNDMyLDQweiIvPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTM5MSwyNzBjLTY2LjcyLDAtMTIxLDU0LjI4LTEyMSwxMjFzNTQuMjgsMTIxLDEyMSwxMjFzMTIxLTU0LjI4LDEyMS0xMjFTNDU3LjcyLDI3MCwzOTEsMjcweiBNMzkxLDQ3MgogICAgICAgICAgICAgICAgICAgICAgICBjLTQ0LjY2MywwLTgxLTM2LjMzNi04MS04MXMzNi4zMzctODEsODEtODFjNDQuNjYzLDAsODEsMzYuMzM2LDgxLDgxUzQzNS42NjMsNDcyLDM5MSw0NzJ6Ii8+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNDIwLDM3MWgtOXYtMjFjMC0xMS4wNDYtOC45NTQtMjAtMjAtMjBjLTExLjA0NiwwLTIwLDguOTU0LTIwLDIwdjQxYzAsMTEuMDQ2LDguOTU0LDIwLDIwLDIwaDI5CiAgICAgICAgICAgICAgICAgICAgICAgIGMxMS4wNDYsMCwyMC04Ljk1NCwyMC0yMEM0NDAsMzc5Ljk1NCw0MzEuMDQ2LDM3MSw0MjAsMzcxeiIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMjk5IiBjeT0iMjEwIiByPSIyMCIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMjEyIiBjeT0iMjk3IiByPSIyMCIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTI1IiBjeT0iMjEwIiByPSIyMCIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTI1IiBjeT0iMjk3IiByPSIyMCIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTI1IiBjeT0iMzg0IiByPSIyMCIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMjEyIiBjeT0iMzg0IiByPSIyMCIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMjEyIiBjeT0iMjEwIiByPSIyMCIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L3N2Zz4=');
    }
</style>