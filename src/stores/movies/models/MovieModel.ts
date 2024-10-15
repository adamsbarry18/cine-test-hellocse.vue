import type GenreModel from './GenreModel';

export default class MovieModel {
  id: number;
  title: string; // le titre
  poster_path: any; // l'affiche
  overview: string; // le synopsis
  director: string; // réalisateur
  stars: string[]; // stars
  genres: GenreModel[]; // les catégories
  vote_average: number; // la note TMDB
  vote_count: number; // Le nombre de personnes ayant noté le film

  constructor(
    id: number,
    title: string,
    poster_path: string,
    overview: string,
    director: string,
    stars: string[],
    genres: GenreModel[],
    vote_average: number,
    vote_count: number,
  ) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
    this.director = director;
    this.stars = stars;
    this.genres = genres;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
  }
}
