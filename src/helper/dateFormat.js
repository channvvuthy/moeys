Date.prototype.getAmPm = function () {
  if (this.getHours() >= 12) {
    return 1
  } // pm
  return 0 // am
}

let locale = {
  en: {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September ', 'October', 'November', 'December'],
    ampm: ['am', 'pm']
  },
  km: {
    month: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា',
      'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'],
    ampm: ['ព្រឹក', 'ល្ងាច']
  }
}

let toLocaleNumber = function (num, lang, zeroPadding) {
  if (typeof num !== 'number') return null

  let numInteger = parseInt(num)
  let numString = numInteger.toString()

  if (zeroPadding > 0 && numString.length < zeroPadding) {
    numString = '0' + numString
  }

  // support only khmer
  if (lang !== 'km') {
    return numString
  }

  let khmerNumber = ''
  let numbersKhmer = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']

  for (let i = 0; i < numString.length; i++) {
    khmerNumber += numbersKhmer[parseInt(numString[i])]
  }

  return khmerNumber
}

let formatDate = function (d, lang) {
  let date = new Date(d)
  let formattedDate
  let hours = date.getHours()
  if (hours > 12) {
    hours -= 12
  }

  formattedDate = toLocaleNumber(date.getDate(), lang, 2)
    + '-'
    + locale[lang]['month'][date.getMonth()]
    + '-'
    + toLocaleNumber(date.getFullYear(), lang)
    + ' '
    + toLocaleNumber(hours, lang, 2)
    + ':'
    + toLocaleNumber(date.getMinutes(), lang, 2)
    + ' '
    + locale[lang]['ampm'][date.getAmPm()]

  return formattedDate
}
export default {
  formatDate,
  toLocaleNumber,

}
