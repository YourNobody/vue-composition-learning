<template>
    <router-view></router-view>
</template>

<script setup>
  import "vue-toastification/dist/index.css";
  import {useDocumentContentLoaded} from '@/hooks';
  import {useToast} from 'vue-toastification';
  import {isOnline} from '@/helpers';

  useDocumentContentLoaded(() => {
    !isOnline().value && useToast().warning('В данный момент подключение к интернету отсутствует.\nНекоторые возможности могут быть недоступны');
  });
</script>

<style lang="scss">
  @import './styles/cancel';
  @import "./styles/variables";
  @import "./styles/vuety";
  @import "./styles/formkit";

  #app {
    min-height: 100vh;
  }

  .container {
    width: 1024px;
    min-height: 100vh;
    margin: 0 auto;
  }

  .container-h-auto {
      width: 1024px;
      margin: 0 auto;
  }
</style>
