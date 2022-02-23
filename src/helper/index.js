import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast)
// Validate only number
const isNumber = (evt) => {
  evt = (evt) ? evt : window.event
  let charCode = (evt.which) ? evt.which : evt.keyCode

  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault()
  } else {
    return true
  }
}
// Cut string with dot
const cutString = function (text, limit) {
  if (text.length > limit) {
    for (let i = limit; i > 0; i--) {
      return text.substring(0, i) + '...'
    }
  } else {
    return text
  }
}
// Format display view like Facebook (1k)
const kFormatter = (num) => {
  if (!num) {
    return 0
  }
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

const error = (message) => {
  Vue.$toast.error(message, {
    position: 'top-right',
  })
}
const success = (message) => {
  Vue.$toast.success(message, {
    position: 'top-right',
  })
}

const q = (payload) => {
  if (!payload) {
    return ''
  }
  return Object.keys(payload)
    .map(key => `${key}=${payload[key]}`)
    .join('&')
}

const datToMilliseconds = (d) => {
  let date = new Date(d) // some mock date
  let milliseconds = date.getTime()
  return milliseconds
}

const getMonth = (month) => {
  let months = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្តដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ']
  return months[month]
}
export default {
  q,
  kFormatter,
  cutString,
  isNumber,
  error,
  success,
  datToMilliseconds,
  getMonth
}
