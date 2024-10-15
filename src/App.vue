<template>
  <div class="app">
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
