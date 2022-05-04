import {ref} from 'vue';

export const useShowVariables = (variables) => {
  if (!variables || !Array.isArray(variables)) return {};
  return variables.reduce((acc, name) => {
    if (!acc[name]) {
      acc[name] = ref(false);
    }
    return acc;
  }, {});
};