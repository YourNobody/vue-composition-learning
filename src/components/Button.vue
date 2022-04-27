<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'c-button'
};
</script>

<style scoped lang="scss">
  @import '../styles/variables';
  @import '../styles/vuety';

  .btn {
    padding: 12px 24px;
    border: 1px solid transparent;
    box-shadow: 0 0 0 1px $green;
    position: relative;
    cursor: pointer;
    outline: none;
    background-color: white;
    transition: color 0.2s;
    transition-delay: 0.2s;
    z-index: 0;

    &:hover {
      color: white;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .btn.go-over, .btn.go-collapse {
    border: none;
    box-shadow: 0 0 0 1px $green;
  }
</style>