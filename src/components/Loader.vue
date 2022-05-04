<template>
  <div class="loader">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-loader-vlines'
};
</script>

<style scoped lang="scss">
@import "../styles/variables";

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: scale(0.9);
}

.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 12px;
  background: $green;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
  left: 0px;
  animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
  left: 24px;
  animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
  left: 48px;
  animation-delay: 0;
}

@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

</style>