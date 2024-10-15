<template>
  <div class="a-rating">
    <strong class="label" v-if="label">{{ label }}</strong>
    <div class="star-rating" :class="{ readonly: readonly }">
      <div
        v-for="star in 10"
        :key="star"
        :class="['star', { 'star-filled': star <= internalRating }]"
        @click="!readonly && updateRating(star)"
        @mouseover="!readonly && hoverRating(star)"
        @mouseleave="!readonly && resetHover"
        :style="{ fontSize: starSize + 'px' }"
      >
        ★
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  modelValue?: number;
  label?: string;
  starSize?: number;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  label: '',
  starSize: 60,
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const internalRating = ref<number>(props.modelValue);
const hoverRatingValue = ref<number>(0);

const updateRating = (value: number): void => {
  emit('update:modelValue', value);
  internalRating.value = value;
};

const hoverRating = (value: number): void => {
  hoverRatingValue.value = value;
};

const resetHover = (): void => {
  hoverRatingValue.value = 0;
};

watch(
  () => props.modelValue,
  (newValue: number) => {
    internalRating.value = newValue;
  },
);
</script>

<style lang="scss" scoped>
.a-rating {
  padding: 12px 0;
  .star-rating {
    background-color: var(--color-white);
    border-radius: 8px;
    display: flex;
    justify-content: left;
    align-items: center;

    .star {
      color: var(--color-grey-400);
      transition: color 0.2s;
    }

    .star-filled {
      color: var(--color-yellow-600);
    }

    &:not(.readonly) .star {
      cursor: pointer;
    }

    &:not(.readonly) .star:hover,
    &:not(.readonly) .star:hover ~ .star {
      color: var(--color-yellow-600);
    }

    &.readonly .star {
      cursor: default;
    }
  }
  .label {
    padding: 0 12px;
  }
}
</style>
