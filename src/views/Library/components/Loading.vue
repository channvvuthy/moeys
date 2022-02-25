<template>
  <div class="ld-ring">
    <div :style="{borderColor:`${color} transparent transparent transparent`}"></div>
    <div :style="{borderColor:`${color} transparent transparent transparent`}"></div>
    <div :style="{borderColor:`${color} transparent transparent transparent`}"></div>
    <div :style="{borderColor:`${color} transparent transparent transparent`}"></div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    color: {
      default: () => {
        return '#174B7C'
      }
    }
  }
}
</script>
<style>
.ld-ring {
  display: inline-block;
  position: relative;
  width: 23px;
  height: 23px;
}

.ld-ring div {
  box-sizing: border-box;
  bottom: -4px;
  display: block;
  position: absolute;
  width: 23px;
  height: 23px;
  border: 2px solid;
  border-radius: 50%;
  animation: ld-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.ld-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.ld-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.ld-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes ld-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
