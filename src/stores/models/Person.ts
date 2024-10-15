export class Person {
  id: number;
  name: string;
  job?: string;
  known_for_department?: string;

  constructor(id: number, name: string, job?: string, known_for_department?: string) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.known_for_department = known_for_department;
  }
}
