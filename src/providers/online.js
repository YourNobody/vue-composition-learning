import {computed, ref, watch} from 'vue';

const isOnline = () => {
  const isOnline = computed(() => window.navigator.onLine);
  watch(isOnline, () => console.log(isOnline))
  return isOnline;
};

export default isOnline;