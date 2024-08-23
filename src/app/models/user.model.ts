import {Recent} from "./recents.model";
import {Project} from "./project.model";
import {AppUserProject} from "./AppUserProject.model";

export class User {
  constructor(
    public id: number,
    public email: string,
    public fullName: string,
    public role: string,
    public password: string,
    public recents: Recent[],
    public appUserProjects: AppUserProject[] = [],
  ) {}
}
