<template>
  <div class="movie-detail">
    <div class="header">
      <h1 class="main-title">{{ $t('movie.detail.title') }}</h1>
      <a-button type="primary" @click="goBack" class="back-button">
        {{ $t('movie.detail.back') }}
      </a-button>
    </div>
    <div class="movie-infos">
      <a-card class="movie-card" :image-url="getImageUrl(movie?.poster_path)" :title="movie?.title">
        <div class="movie-info">
          <p class="description">{{ movie?.overview }}</p>
          <p class="categories">
            <strong>{{ $t('movie.detail.categories') }}</strong>
            <span v-for="(category, index) in movie?.genres" :key="index">
              <a-tag color="var(--color-rose-500)">{{ category.name }}</a-tag>
            </span>
          </p>
          <p class="director">
            <strong>{{ $t('movie.detail.director') }}</strong> {{ director?.name }}
          </p>
          <p class="stars">
            <strong>{{ $t('movie.detail.star') }}</strong>
            <span class="star" v-for="(star, index) in stars" :key="star.id"> {{ star.name }}<span v-if="index < stars.length - 1">, </span> </span>
          </p>
          <p class="rating">
            <strong>{{ $t('movie.detail.rating') }}</strong>
            {{ Math.round(movie?.vote_average ?? 0) }} / 10 ({{ movie?.vote_count }} {{ $t('movie.detail.vote') }})
          </p>
        </div>
      </a-card>
    </div>
    <div class="comment">
      <div class="comment-buttons">
        <a-button type="primary" @click="showForm = true">{{ $t('movie.comment.button.view-form') }}</a-button>
        <a-button @click="showForm = false">
          {{ $t('movie.comment.list.other.view') }}
          <a-tag color="var(--color-light-blue-900)">{{ totalComment(currentMovieId) }}</a-tag>
        </a-button>
      </div>
      <div v-if="showForm" class="comment-form">
        <movie-comment :current-movie-id="currentMovieId" />
      </div>
      <div v-else class="list-comment">
        <movie-comment-list :movie-id="currentMovieId" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '@/stores/movies/movies';
import { useCommentStore } from '@/stores/comments/comments';
import ACard from '@/modules/shared/layout/ACard.vue';
import MovieComment from '@/modules/comments/_views/MovieComment.vue';
import MovieCommentList from '@/modules/comments/_views/MovieCommentList.vue';
import AButton from '@/modules/basic/AButton.vue';
import ATag from '@/modules/others/ATag.vue';
import MovieModel from '@/stores/movies/models/MovieModel';
import { Director } from '@/stores/models/Director';
import { Star } from '@/stores/models/Star';

const router = useRouter();
const route = useRoute();
const movieStore = useMovieStore();
const commentStore = useCommentStore();

const { getImageUrl } = storeToRefs(movieStore);
const { totalComment } = storeToRefs(commentStore);

const movie = ref<MovieModel | null>(null);
const showForm = ref(true);
const director = ref<Director | null>(null);
const stars = ref<Star[]>([]);

const currentMovieId = computed<number>(() => {
  const movieId = route.params.movieId;
  const id = Array.isArray(movieId) ? movieId : movieId;
  return Number(id);
});

const goBack = (): void => {
  router.push({ name: 'movie.list' });
};

onMounted(async () => {
  movie.value = await movieStore.fetchMovieById(currentMovieId.value);
  const castAndCrew = await movieStore.fetchCastAndCrew(currentMovieId.value);
  director.value = castAndCrew.director;
  stars.value = castAndCrew.stars;
});
</script>

<style lang="scss" scoped>
.movie-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    .main-title {
      font-size: 2.5rem;
      color: var(--color-light-blue-900);
      margin: 0;
    }

    .back-button {
      font-size: 1rem;
    }
  }

  .movie-infos {
    display: flex;
    justify-content: center;
    border-radius: 12px;
    background-color: var(--color-light-blue-900);
    padding: 50px 0;
    margin-bottom: 30px;

    .movie-card {
      border-radius: 12px;
      background-color: var(--color-grey-300);
      max-width: 80%;
      width: 100%;

      .movie-info {
        padding: 20px;
        text-align: justify;

        .description {
          margin-bottom: 20px;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .categories,
        .director,
        .stars,
        .rating {
          font-size: 1rem;
          margin-top: 10px;
        }

        .rating {
          font-weight: bold;
          color: var(--color-yellow-600);
        }

        .star {
          font-weight: 500;
        }
      }
    }
  }

  .comment {
    display: flex;
    flex-direction: column;
    align-items: center;

    .comment-buttons {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
    }

    .comment-form,
    .list-comment {
      width: 100%;
      max-width: 800px;
    }
  }
}
</style>
