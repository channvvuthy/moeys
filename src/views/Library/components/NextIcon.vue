<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24">
    <g :fill="fill">
      <path d="M19 12l-18 12v-24l18 12zm4-11h-4v22h4v-22z"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'NextIcon',
  props: {
    fill: {
      default: () => {
        return '#000'
      }
    },
    size: {
      default: () => {
        return 24
      }
    }
  }
}
</script>

<style scoped>

</style>
