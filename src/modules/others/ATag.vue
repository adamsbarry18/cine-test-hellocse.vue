<template>
  <v-chip :color="color">
    <slot></slot>
  </v-chip>
</template>

<script lang="ts" setup>
interface Props {
  color?: string;
}

withDefaults(defineProps<Props>(), {
  color: 'var(--color-grey-400)',
});
</script>
