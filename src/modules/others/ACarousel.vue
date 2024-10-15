<template>
  <v-carousel
    :continuous="continuous"
    :cycle="cycle"
    :interval="interval"
    :show-arrows="showArrows"
    :height="height"
    hide-delimiter-background
    delimiter-icon="mdi-minus"
    class="a-carousel"
  >
    <v-carousel-item v-for="(item, index) in items" :key="index">
      <div class="carousel-item-container">
        <v-img :src="item.src" :alt="item.alt" :height="height" class="carousel-image" cover>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
          <div class="image-overlay">
            <h3 class="image-title">{{ item.alt }}</h3>
          </div>
        </v-img>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts" setup>
interface CarouselItem {
  src: string;
  alt: string;
}

interface Props {
  items: CarouselItem[];
  continuous?: boolean;
  cycle?: boolean;
  interval?: number;
  showArrows?: boolean;
  height?: string | number;
}

withDefaults(defineProps<Props>(), {
  continuous: true,
  cycle: true,
  interval: 6000,
  showArrows: true,
  height: 400,
});
</script>

<style lang="scss" scoped>
.a-carousel {
  border-radius: 8px;
  .carousel-item-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .carousel-image {
    width: 100%;
    border-radius: 8px;
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
    color: white;
    padding: 20px;
    text-align: left;
  }

  .image-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  :deep(.v-btn) {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
  }

  :deep(.v-carousel__controls) {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
  }
}
</style>
