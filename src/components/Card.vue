<template>
  <n-card
    class='c-card-component'
    :title="insertIntoName(user.name, user.username)"
    :segmented="{
      content: false,
      footer: 'soft'
    }"
  >
    <template #header-extra>
      {{ user.email }}
    </template>
    <template #footer>
      <div class='quick__info'>
        <h4>
          <span class='label'>Website:</span>
          <span class='content'>{{ user.website }}</span>
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
    </template>
    <div></div>
  </n-card>
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

<style lang='scss'>
.c-card-component {
  //border: 1px solid var(--n-close-color) !important;
  background-color: white;

  .n-card__content {
    display: none;
  }

  .n-card__footer:not(:first-child) {
    //border-top: 1px solid var(--n-close-color) !important;
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

  .quick__info {
    display: grid;
    gap: 12px;
  }
}
</style>