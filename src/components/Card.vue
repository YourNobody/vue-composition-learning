<template>
  <div class='card'>
    <div>
      <h3>
        <span class='label'>Name:</span>
        <span class='content'>{{ insertIntoName(user.name, user.username) }}</span>
      </h3>
      <h4>
        <span class='label'>Email:</span>
        <span class='content'>{{ user.email }}</span>
      </h4>
      <h4>
        <span class='label'>Company</span>
        <span class='content'>{{ user.company.name }}</span>
      </h4>
      <h4>
        <span class='label'>City:</span>
        <span class='content'>{{ user.address.city }}</span>
      </h4>
    </div>
    <div></div>
  </div>
</template>

<script>
import {insertIntoName} from '@/helpers';
import {toRefs} from 'vue';

export default {
  name: 'c-card',
  props: {
    userData: [Object]
  },
  setup(props, context) {
    const {userData: user} = toRefs(props);
    return {
      user,
      insertIntoName
    };
  }
};
</script>

<style scoped lang='scss'>
.card {
  padding: 15px;
  border: 1px solid black;
}

h3, h4 {
  font-weight: 500;
  display: grid;
  grid-template-columns: 60px auto;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  .label {
    font-size: 14px;
    color: gray;
  }
}
</style>