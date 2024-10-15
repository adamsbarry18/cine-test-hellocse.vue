import { Person } from './Person';

export class Director extends Person {
  constructor(id: number, name: string) {
    super(id, name, 'Director');
  }
}
