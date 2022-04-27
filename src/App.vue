<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
  import "vue-toastification/dist/index.css";
  import {inject, onMounted, ref, watch} from 'vue';
  import {useDocumentContentLoaded} from '@/hooks';
  import {useToast} from 'vue-toastification';

  const isOnline = inject('isOnline');
  useDocumentContentLoaded(() => {
    !isOnline().value && useToast().warning('В данный момент подключение к интернету отсутствует.\nНекоторые возможности могут быть недоступны');
  });
</script>

<style lang="scss">
  @import './styles/cancel';
  @import "./styles/variables";
  @import "./styles/vuety";
  @import "./styles/formkit";
  @import "./styles/toast";

  #app {
    min-height: 100vh;
  }

  .container {
    width: 1024px;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
  }
</style>
