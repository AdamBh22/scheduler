import { Task } from './task.model';

export class Dependency {
  constructor(public id: number, public status: string, public task1: Task) {}
}
