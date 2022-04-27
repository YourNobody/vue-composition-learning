<template>
  <div class="main" v-interactive="interactOption">
    <div class="main__logo">
      <h1>Vue App</h1>
      <p>Using Composition API</p>
    </div>
    <div class="main__routes">
      <c-button
        class="go-over"
        @click="changeBlock('/auth')"
      >Authorise</c-button>
      <c-button
        class="go-over"
        @click="changeBlock('/users')"
      >Use as Guest</c-button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const interactOption = ref('top');

const changeBlock = (route) => {
  document.body.style.overflow = 'hidden';
  interactOption.value = 'bottom';

  setTimeout(() => {
    router.push(route);
  }, 200);
};
</script>

<style scoped lang="scss">
  @import "../styles/variables";
  @import "../styles/animations";

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;

    min-height: 100vh;
  }

  .main__logo {
    text-align: center;
    p {
      line-height: 26px;
      font-size: 16px;
      color: $lightGray;
    }
  }

  .main__routes {
    margin-top: 20px;

    & > *:nth-of-type(1) {
      margin-right: 15px;
    }
  }
</style>