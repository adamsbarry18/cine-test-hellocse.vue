import { defineStore } from 'pinia';
import apiClient from '@/services/api';
import MovieModel from './models/MovieModel';
import { Director } from '../models/Director';
import { Star } from '../models/Star';
import { ServerError } from '@/libs/utils/Errors';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [] as MovieModel[],
    searchResults: [] as MovieModel[],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
  }),
  getters: {
    topMovies: (state) => state.movies.slice(0, 20),
    getImageUrl: () => (path: string) => (path ? `${IMAGE_BASE_URL}${path}` : ''),
    hasMoreMovies: (state) => state.currentPage < state.totalPages,
  },
  actions: {
    async fetchMovies(page = 1) {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        const response = await apiClient.get('/discover/movie', {
          params: {
            language: 'en-US',
            page,
            sort_by: 'popularity.desc',
          },
        });

        if (page === 1) {
          this.movies = response.data.results;
        } else {
          this.movies = [...this.movies, ...response.data.results];
        }

        this.currentPage = response.data.page;
        this.totalPages = response.data.total_pages;
      } catch (error: any) {
        throw new ServerError('movies', 'fetchMovies', error, {});
      } finally {
        this.isLoading = false;
      }
    },
    async searchMovies(query: string, page = 1) {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        const response = await apiClient.get('/search/movie', {
          params: {
            query,
            language: 'en-US',
            page,
          },
        });

        if (page === 1) {
          this.searchResults = response.data.results;
        } else {
          this.searchResults = [...this.searchResults, ...response.data.results];
        }

        this.currentPage = response.data.page;
        this.totalPages = response.data.total_pages;
      } catch (error: any) {
        throw new ServerError('movies', 'searchMovies', error, {});
      } finally {
        this.isLoading = false;
      }
    },
    async fetchMovieById(movieId: number): Promise<MovieModel> {
      try {
        const response = await apiClient.get(`/movie/${movieId}`, {
          params: {
            language: 'en-US',
          },
        });
        return response.data;
      } catch (error: any) {
        throw new ServerError('movies', 'fetchMovieById', error, { movieId });
      }
    },
    async fetchCastAndCrew(movieId: number): Promise<{ director: Director | null; stars: Star[] }> {
      try {
        const response = await apiClient.get(`/movie/${movieId}/credits`, {
          params: {
            language: 'en-US',
          },
        });
        const directorData = response.data.crew.find((member: any) => member.job === 'Director');
        const director = directorData ? new Director(directorData.id, directorData.name) : null;
        const stars = response.data.cast
          .filter((member: any) => member.known_for_department === 'Acting')
          .map((starData: any) => new Star(starData.id, starData.name));
        return {
          director,
          stars,
        };
      } catch (error: any) {
        throw new ServerError('movies', 'fetchCastAndCrew', error, { movieId });
      }
    },
  },
});
