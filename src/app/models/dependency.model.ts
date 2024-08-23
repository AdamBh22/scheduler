import { Task } from './task.model';

export class Dependency {
  constructor(
    public status: string,
    public task: Task,
    public relatedTaskId: number,
    public id?: number
  ) {}
}
