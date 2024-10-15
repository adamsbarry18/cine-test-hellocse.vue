<template>
  <div class="a-grid-list">
    <a-grid class="grid">
      <v-col class="col" v-for="(item, index) in items" :key="index" :cols="12" :sm="6" :md="4" :lg="3" :xl="2">
        <slot name="item" :item="item"></slot>
      </v-col>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import AGrid from 'src/modules/shared/layout/AGrid.vue';
import MovieModel from '@/stores/movies/models/MovieModel';

interface Props {
  items: MovieModel[];
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.a-grid-list {
  .grid {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
