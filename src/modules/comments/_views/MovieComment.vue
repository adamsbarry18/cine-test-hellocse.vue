<template>
  <div class="movie-comment">
    <div class="form">
      <a-form-input
        :label="$t('movie.comment.username-input.label')"
        v-model="comment.username"
        :placeholder="$t('movie.comment.username.placeholder')"
        :error="usernameError"
        :message-error="$t('movie.comment.username-input.message-error')"
      />

      <a-form-input
        :label="$t('movie.comment.message-input.label')"
        v-model="comment.message"
        type="textarea"
        :placeholder="$t('movie.comment.message.placeholder')"
        :error="messageError"
        :message-error="$t('movie.comment.message-input.message-error')"
      />

      <a-rating v-model="comment.note" :label="$t('movie.comment.rating.label')" />

      <a-button class="button-add-comment" type="primary" @click="submitComment" :disabled="!canSave">
        {{ $t('movie.comment.button.add') }}
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useCommentStore } from '@/stores/comments/comments';
import CommentModel from '@/stores/comments/models/CommentModel';
import AFormInput from '@/modules/shared/forms/AFormInput.vue';
import AButton from 'src/modules/basic/AButton.vue';
import ARating from '@/modules/others/ARating.vue';

interface Props {
  currentMovieId: number;
}

const props = defineProps<Props>();

const commentStore = useCommentStore();
const { addCommentMovie } = commentStore;

const comment = ref<CommentModel>(new CommentModel(props.currentMovieId, '', '', 1));

const usernameError = computed((): boolean => {
  const length = comment.value.username.length;
  return length < 3 || length > 50;
});

const messageError = computed((): boolean => {
  const length = comment.value.message.length;
  return length < 3 || length > 500;
});

const canSave = computed((): boolean => {
  return !usernameError.value && !messageError.value && comment.value.username.length > 0 && comment.value.message.length > 0;
});

const submitComment = (): void => {
  if (canSave.value) {
    try {
      const newComment = new CommentModel(props.currentMovieId, comment.value.username, comment.value.message, comment.value.note);
      addCommentMovie(props.currentMovieId, newComment);
      comment.value = new CommentModel(props.currentMovieId, '', '', 1);
    } catch (error) {
      console.error('Erreur de sauvegarde', error);
    }
  }
};
</script>

<style scoped lang="scss">
.movie-comment {
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-grey-100);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .button-add-comment {
    align-self: flex-end;
    margin-top: 20px;
  }
}
</style>
