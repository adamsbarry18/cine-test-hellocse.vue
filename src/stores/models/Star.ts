import { Person } from './Person';

export class Star extends Person {
  constructor(id: number, name: string) {
    super(id, name, undefined, 'Acting');
  }
}
