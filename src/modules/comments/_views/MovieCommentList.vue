<template>
  <div class="movie-comment-list">
    <movie-comment-card :title="$t('movie.comment.list.other')" :items="comments">
      <template v-for="(item, index) in comments" :key="item.id">
        <div class="list-item" :class="{ 'last-item': index === comments.length - 1 }">
          <img src="@/assets/images/avatar.png" class="avatar" />
          <div class="comment-content">
            <div class="username">{{ item.username }}</div>
            <div class="message">{{ item.message }}</div>
            <div class="rating">
              <strong>{{ $t('movie.detail.rating') }} </strong>
              <a-rating v-model="item.note" :starSize="40" :readonly="true"></a-rating>
            </div>
          </div>
        </div>
      </template>
    </movie-comment-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommentStore } from '@/stores/comments/comments';
import MovieCommentCard from '../_components/MovieCommentCard.vue';
import ARating from '@/modules/others/ARating.vue';
import CommentModel from '@/stores/comments/models/CommentModel';

interface Props {
  movieId: number;
}

const props = defineProps<Props>();

const commentStore = useCommentStore();
const { getMovieComments } = storeToRefs(commentStore);

const comments = computed((): CommentModel[] => {
  return getMovieComments.value(props.movieId);
});
</script>

<style scoped lang="scss">
.movie-comment-list {
  margin-top: 20px;

  .list-item {
    display: flex;
    padding: 16px;
    border-bottom: 1px solid var(--color-grey-500);

    &.last-item {
      border-bottom: none;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 16px;
    }

    .comment-content {
      display: flex;
      flex-direction: column;
      max-width: 800px;

      .username {
        font-weight: bold;
        margin-bottom: 4px;
      }

      .message {
        padding-right: 100px;
        color: var(--color-grey-500);
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: pre-wrap;
      }

      .rating {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
