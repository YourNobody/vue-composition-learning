<template>
  <div class="notifications-wrapper">
    <ul class="notification-messages">
      <li class="notification-message">Notify!</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'c-notification'
};
</script>

<style scoped>
  .notifications-wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>