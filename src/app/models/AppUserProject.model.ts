import {User} from "./user.model";
import {Project} from "./project.model";


export class AppUserProject {
  constructor(
    public user:User,
    public project:Project,
    public id?: number,
    ) {}
}
