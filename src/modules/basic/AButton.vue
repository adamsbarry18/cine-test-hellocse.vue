<template>
  <button
    ref="button"
    :disabled="disabled"
    class="a-button"
    :class="[
      typeClass,
      sizeClass,
      {
        '-disabled': disabled,
        '-round': round,
      },
    ]"
    :title="collapsable ? '' : title"
    @click.stop="handleClick"
  >
    <slot />
    <div v-if="collapsable" class="label-btn">
      <span class="label-txt">{{ label || title }}</span>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  type?: string;
  size?: string;
  round?: boolean;
  disabled?: boolean;
  collapsable?: boolean;
  title?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  round: false,
  disabled: false,
  collapsable: false,
});

const emit = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const typeClass = computed(() => (props.type ? `-${props.type}` : '-default'));
const sizeClass = computed(() => (props.size ? `-${props.size}` : ''));

const handleClick = (evt: Event): void => {
  emit('click', evt);
};
</script>

<style lang="scss" scoped>
.a-button {
  color: var(--color-grey-700);
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in-out;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  padding: 0px 20px;
  min-width: 75px;
  min-height: 42px;
  font-size: 16px;
  font-weight: 600;

  // État désactivé
  &.-disabled {
    cursor: not-allowed;
    pointer-events: auto;
    color: var(--color-grey-500);
    background-color: var(--color-grey-200);
    &:hover {
      background-color: var(--color-grey-200);
    }
  }

  // Type Default (style neutre par défaut)
  &.-default {
    color: var(--color-grey-900);
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-300);
    &:hover {
      background-color: var(--color-grey-200);
    }
    &:focus {
      background-color: var(--color-grey-200);
      outline: 3px solid var(--color-grey-300);
    }
  }

  // Type Primary
  &.-primary {
    color: var(--color-white);
    background-color: var(--color-light-blue-900);
    &:hover {
      background-color: var(--color-light-blue-400);
    }
    &:focus {
      background-color: var(--color-light-blue-400);
      outline: 3px solid var(--color-light-blue-100);
    }
  }

  // Type Warning
  &.-warning {
    color: var(--color-white);
    background-color: var(--color-yellow-500);
    &:hover {
      background-color: var(--color-yellow-400);
    }
    &:focus {
      background-color: var(--color-yellow-400);
      outline: 3px solid var(--color-yellow-100);
    }
  }

  // Type Danger
  &.-danger {
    color: var(--color-white);
    background-color: var(--color-red-500);
    &:hover {
      background-color: var(--color-red-400);
    }
    &:focus {
      background-color: var(--color-red-400);
      outline: 3px solid var(--color-red-100);
    }
  }

  // Type Tertiary
  &.-tertiary {
    color: var(--color-white);
    background-color: var(--color-grey-800);
    &:hover {
      background-color: var(--color-grey-700);
    }
    &:focus {
      background-color: var(--color-grey-700);
      outline: 3px solid var(--color-grey-300);
    }
  }

  // Bouton rond
  &.-round {
    border-radius: 50%;
    padding: 0;
    width: 40px;
    height: 40px;
  }
}
</style>
