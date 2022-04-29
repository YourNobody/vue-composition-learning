import {reactive, ref} from 'vue';
import {useToast} from 'vue-toastification';
import {reset} from '@formkit/vue'
import {clearObjectValues} from '@/helpers';

export const useForm = (formName, validators = {}, customMessages = {}) => {
  if (!formName) throw new Error(`Can't create form without formName`);
  let forms = null;
  if (Array.isArray(formName)) {
    forms = reactive(
      [...new Set(formName)].reduce((acc, formKey) => {
        acc[formKey] = {};
        return acc;
      }, {})
    );
  } else {
    forms = reactive({
      [formName]: {}
    });
  }

  const toast = useToast();

  const formsValidators = reactive(
    [...new Set(Object.keys(validators))].reduce((acc, key) => {
      acc[key] = convertValidatorsToArray(validators[key]);
      return acc;
    }, {})
  );

  const validationMessages = reactive(
    [...new Set(Object.keys(validators))].reduce((acc, key) => {
      if (customMessages[key]) {
        acc[key] = customMessages[key];
      }
      return acc;
    }, {})
  );

  const getValidators = field => {
    if (!field) return {};
    return formsValidators[field];
  };

  const getCustomValidationMessages = field => {
    if (!field) return {};
    return validationMessages[field];
  };

  const isFormProcessing = ref(false);
  const isValid = ref(false);

  const handleSubmit = async (formName, callback = ()=>{}, reset) => {
    if (!formName || !forms[formName]) return;
    isFormProcessing.value = true;

    const response = await callback({...forms[formName]});
    if (!response) {
      isFormProcessing.value = false;
      return;
    } else if (response.error) {
      toast.error(response.error);

      if (reset && typeof reset === 'function') {
        reset();
      } else {
        clearObjectValues(forms[formName], ['email']);
      }
    }

    reset ? reset() : clearObjectValues(forms[formName]);

    isFormProcessing.value = false;
    return response;
  };

  return {
    forms, formsValidators, isFormProcessing, isValid,
    getValidators, getCustomValidationMessages, handleSubmit
  };
};

function convertValidatorsToArray(validators = {}) {
  return [...new Set(Object.keys(validators))].reduce((acc, key) => {
    if (typeof validators[key] === 'boolean') acc.push([key]);
    else acc.push([key, String(validators[key])]);
    return acc;
  }, []);
}