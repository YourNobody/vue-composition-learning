<template>
  <button
    class="btn"
  >
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

button {
  padding: 10px;
  background-color: transparent;
}

.btn {
  padding: 12px 24px;
  position: relative;
  box-shadow: 0 0 0 1px $green;
  cursor: pointer;
  outline: none;
  background-color: white;
  transition: color 0.2s;
  transition-delay: 0.2s;
  z-index: 0;

  &:hover {
    color: black;
  }

  &:active {
    transform: scale(0.95);
  }
}

.borderly {
  box-shadow: 0 0 0 1px $green;
}

.btn.go-over, .btn.go-collapse {
  border: none;
  box-shadow: 0 0 0 1px $green;

  &:hover {
    color: white;
  }
}
</style>