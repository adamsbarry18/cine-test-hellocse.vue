import { v4 as uuidv4 } from 'uuid';
export default class CommentModel {
  id: number | string;
  movieId: number;
  username: string;
  message: string;
  note: number;
  createdAt: Date;

  constructor(movieId: number, username: string, message: string, note: number) {
    this.id = `c-${uuidv4().substring(0, 4)}`;
    this.movieId = movieId;
    this.username = username;
    this.message = message;
    this.note = note;
    this.createdAt = new Date();
  }
}
