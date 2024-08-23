import { Task } from './task.model';
import {User} from "./user.model";
import {AppUserProject} from "./AppUserProject.model";

export class Project {
  constructor(
    public name: string,
    public tasks: Task[] = [],
    public appUserProjects: AppUserProject[] = [],
    public id?: number,
  ) {}
}
