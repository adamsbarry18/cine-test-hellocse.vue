import { createRouter, createWebHashHistory } from 'vue-router';
import MovieList from '@/modules/movies/_views/MovieList.vue';
import MovieDetail from '@/modules/movies/_views/MovieDetail.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'movie.list',
      path: '/',
      component: MovieList,
    },
    {
      name: 'movie.detail',
      path: '/:movieId',
      component: MovieDetail,
    },
  ],
});

export default router;
