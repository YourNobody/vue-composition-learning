<template>
  <div class="main container" v-interactive="interactOption">
    <div class="main__logo">
      <h1>Vue App</h1>
      <p>Using Composition API</p>
      <span
        class="main__logo_auth"
        :class="call(isAuthenticated) && 'authed'"
        v-text="isAuthenticatedText"
      ></span>
    </div>
    <div class="main__routes">
      <template v-if="!call(isAuthenticated)">
        <c-button
          class="go-over"
          @click="changeBlock('/auth')"
        >Авторизироваться</c-button>
        <c-button
          class="go-over"
          @click="changeBlock('/users')"
        >Продолжить как гость</c-button>
      </template>
      <template v-if="call(isAuthenticated)">
        <c-button
          class="go-over"
          @click="signout"
        >Разлогиниться</c-button>
        <c-button
          class="go-over"
          @click="changeBlock('/users')"
        >Перейти к приложению</c-button>
      </template>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useVuex} from '@/hooks';
import {useFirebase} from '@/hooks/useFirebaseServices';

const router = useRouter();
const interactOption = ref('top');

const changeBlock = (route) => {
  document.body.style.overflow = 'hidden';
  interactOption.value = 'bottom';

  setTimeout(() => {
    router.push(route);
  }, 200);
};

const {signout} = useFirebase();
const {mapGetters, call} = useVuex();
const {isAuthenticated} = mapGetters({ isAuthenticated: 'auth/isAuthenticated' });
const isAuthenticatedText = `[ ${call(isAuthenticated) ? 'Вы авторизованы' : 'Вы не авторизованы'} ]`
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

    .main__logo_auth {
      font-size: 14px;
      padding-top: 12px;
      color: gray;

      &.authed {
        color: $green;
      }
    }
  }

  .main__routes {
    margin-top: 12px;

    & > *:nth-of-type(1) {
      margin-right: 15px;
    }
  }
</style>