import { Task } from './task.model';
import {User} from "./user.model";

export class Project {
  constructor(
    public id: number,
    public name: string,
    public tasks: Task[] = [],
    public users: User[] = []
  ) {}
}
