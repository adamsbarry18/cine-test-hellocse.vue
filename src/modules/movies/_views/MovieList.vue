<template>
  <div class="movie-list">
    <a-carousel :items="carouselItems" :height="400" class="movie-carousel" />
    <a-form-input
      class="search-movie"
      :label="t('movie.list.search.label')"
      :placeholder="t('movie.list.search.placeholder')"
      v-model="searchQuery"
      :error="hasError"
      :message-error="errorMessage"
    />
    <a-grid-list :items="displayedMovies" class="grid-container">
      <template #item="{ item }">
        <a-card class="grid-item" :image-url="getImageUrl(item.poster_path)" :title="item.title" @click="onViewMovie(item.id)" />
      </template>
    </a-grid-list>
    <infinite-scroll-button :has-more="hasMoreMovies" :loading="isLoading" @load-more="loadMoreMovies" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useMovieStore } from '../../../stores/movies/movies';
import AGridList from 'src/modules/shared/layout/AGridList.vue';
import ACard from 'src/modules/shared/layout/ACard.vue';
import AFormInput from 'src/modules/shared/forms/AFormInput.vue';
import ACarousel from 'src/modules/others/ACarousel.vue';
import InfiniteScrollButton from 'src/modules/movies/_components/InfiniteScrollButton.vue';
import debounce from 'lodash/debounce';

import type { MessageSchema } from '@/i18n';
import type { ComputedRef } from 'vue';
import type { Router } from 'vue-router';
import type MovieModel from '@/stores/movies/models/MovieModel';

interface CarouselItem {
  src: string;
  alt: string;
}

const router: Router = useRouter();
const { t } = useI18n<{ message: MessageSchema }>();
const movieStore = useMovieStore();
const { movies, searchResults, topMovies, getImageUrl, hasMoreMovies, isLoading } = storeToRefs(movieStore);
const { fetchMovies, searchMovies } = movieStore;

const searchQuery = ref<string>('');
const hasError = ref<boolean>(false);
const errorMessage = ref<string>('');

const displayedMovies = computed(() => (searchQuery.value ? searchResults.value : movies.value));

const carouselItems: ComputedRef<CarouselItem[]> = computed(() =>
  topMovies.value.map((movie: MovieModel) => ({
    src: getImageUrl.value(movie.poster_path),
    alt: movie.title,
  })),
);

const onSearchInput = debounce(async (): Promise<void> => {
  hasError.value = false;
  errorMessage.value = '';

  if (searchQuery.value.trim() === '') {
    await fetchMovies(1);
  } else {
    try {
      await searchMovies(searchQuery.value, 1);
    } catch (error) {
      hasError.value = true;
      errorMessage.value = t('movie.list.search.error');
    }
  }
}, 500);

const onViewMovie = (movieId: number): void => {
  router.push({ name: 'movie.detail', params: { movieId: movieId.toString() } });
};

const loadMoreMovies = async (): Promise<void> => {
  if (searchQuery.value.trim() === '') {
    await fetchMovies(movieStore.currentPage + 1);
  } else {
    await searchMovies(searchQuery.value, movieStore.currentPage + 1);
  }
};

watch(searchQuery, onSearchInput);

onMounted(async (): Promise<void> => {
  await fetchMovies(1);
});
</script>

<style lang="scss" scoped>
.movie-list {
  width: 100%;
  padding: 20px;
  background-color: var(--color-light-blue-900);

  .movie-carousel {
    width: 100%;
    margin-bottom: 20px;
  }

  .grid-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .grid-item {
      flex: 1 1 calc(33.333% - 32px);
      padding-right: 8px;
      padding-left: 8px;
      margin-bottom: 30px;
    }
  }

  .search-movie {
    margin-bottom: 20px;
    border-radius: 12px;
    background-color: var(--color-white);
  }
}
</style>
