import {computed, ref, watch} from 'vue';
import {useToast} from 'vue-toastification';

export const isOnline = () => {
  const isOnline = computed(() => window.navigator.onLine);
  watch(isOnline, () => console.log(isOnline))
  return isOnline;
};

export const notifyIfIsOffline = (message) => {
  !isOnline().value && useToast().warning(message || 'В данный момент подключение к интернету отсутствует.\nДанная функция не может быть выполнена');
  return !isOnline().value;
};

export const clearObjectValues = (obj, exclude) => {
  if (!obj) return;
  for (const key in obj) {
    if (exclude && Array.isArray(exclude) && exclude.includes(key)) continue;
    if (obj[key].value) obj[key].value = '';
    else obj[key] = '';
  }
};

export const mapFilterOptions = (filterOptions, whatToMap = 'label') => {
  return filterOptions.map(option => option[whatToMap]);
};