<template>
  <v-container fluid class="a-grid">
    <v-row dense>
      <slot></slot>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.a-grid {
  padding: 0;
  margin: 0 -4px;

  :deep(.v-row) {
    margin: 0;
  }
}
</style>
