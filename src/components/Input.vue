<template>
  <div class="input-block">
    <label
      v-if="label"
      :for="inputId"
    >{{ label }}</label>
    <input
      type="text"
      :class="{
        'error': errors && errors.length,
        [classes.inputClass]: classes.inputClass
      }"
      :style="styles.inputStyle && styles.inputStyle"
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder || 'Введите текст'"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="errors && errors.length" class="errors">
      <span
        v-for="error in errors"
        :key="error"
        class="error-message"
      >{{ error }}</span>
    </div>
  </div>
</template>

<script>
import {v4} from 'uuid';

export default {
  name: 'c-input',
  props: {
    errors: [Array],
    label: [String],
    placeholder: [String],
    modelValue: [String, Number]
  },
  setup(props, context) {
    const inputId = v4();

    const classes = {
      inputClass: context.attrs['input-class']
    };

    const styles = {
      inputStyle: context.attrs['input-style']
    };

    return {
      inputId, classes, styles
    };
  }
};
</script>

<style scoped lang="scss">
  @import "../styles/variables";

  label {
    font-size: 16px;
  }

  input {
    width: 100%;
    padding: 10px 8px;
    font-size: 16px;
    border: 2px solid black;
  }

  input:focus {
    border-color: $green;
  }

  input.error {
    border-color: $red;
  }

  .input-block {
    display: grid;
    gap: 5px;
  }

  .errors {
    display: grid;
    gap: 8px;
  }
</style>