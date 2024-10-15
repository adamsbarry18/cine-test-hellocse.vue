import { defineStore } from 'pinia';
import { ServerError } from '@/libs/utils/Errors';
import type CommentModel from './models/CommentModel';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: JSON.parse(localStorage.getItem('movieComments') || '[]') as CommentModel[],
  }),
  getters: {
    getMovieComments: (state) => (movieId: number) => {
      return state.comments
        .filter((comment) => comment.movieId.toString() === movieId.toString())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    totalComment: (state) => (movieId: number) => {
      return state.comments.filter((comment) => comment.movieId.toString() === movieId.toString()).length;
    },
  },
  actions: {
    addCommentMovie(movieId: number, comment: CommentModel) {
      try {
        comment.movieId = movieId;
        this.comments.push(comment);
        localStorage.setItem('movieComments', JSON.stringify(this.comments)); // Sauvegarder dans localStorage
      } catch (error: any) {
        throw new ServerError('comments', 'addCommentMovie', error, { movieId });
      }
    },
  },
});
