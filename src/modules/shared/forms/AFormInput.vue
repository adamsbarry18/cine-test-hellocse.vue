<template>
  <div class="a-form-input">
    <strong v-if="label" class="form-label">{{ label }}</strong>
    <input
      v-if="type === 'input'"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event)"
      :class="['form-control', { 'is-invalid': error && modelValue }]"
      :min="min"
      :max="max"
    />
    <textarea
      v-else
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event)"
      :class="['form-control', { 'is-invalid': error && modelValue }]"
      :minlength="min"
      :maxlength="max"
    ></textarea>

    <div v-if="error && modelValue" class="error-message">{{ messageError }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  error?: boolean;
  min?: number;
  max?: number;
  messageError?: string;
  type?: 'input' | 'textarea';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  error: false,
  min: 0,
  messageError: 'Invalid input',
  type: 'input',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const updateValue = (event: Event): void => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
.a-form-input {
  padding: 12px;

  .form-label {
    display: block;
    margin-bottom: 8px;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-grey-900);
    background-color: var(--color-white);
    border: 1px solid var(--color-grey-300);
    border-radius: 8px;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    appearance: none;

    &:focus {
      border-color: var(--color-light-blue-900);
      outline: none;
      box-shadow: 0 0 0 12px var(--color-light-blue-100);
    }

    &.is-invalid {
      border-color: var(--color-red-700);
    }
  }

  textarea.form-control {
    min-height: 100px;
  }

  .error-message {
    color: var(--color-red-700);
    font-size: 12px;
  }
}
</style>
