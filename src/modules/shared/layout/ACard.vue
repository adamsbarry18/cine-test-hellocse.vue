<template>
  <div class="a-card">
    <v-card class="card" @click="emitView">
      <v-img :src="imageUrl" :aspect-ratio="3 / 3" cover>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <h4 class="card-title">{{ title }}</h4>
      <slot></slot>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

interface Props {
  imageUrl: string;
  title?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'view'): void;
}>();

const emitView = () => {
  emit('view');
};
</script>

<style lang="scss" scoped>
.a-card {
  .card {
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px var(--color-grey-900);
    }

    .card-title {
      padding: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
