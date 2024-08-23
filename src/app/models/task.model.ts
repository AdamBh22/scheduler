import { Dependency } from './dependency.model';
import { Comment } from './comment.model';
import { Activity } from './activity.model';
import { Project } from "./project.model";

export class Task {
  name: string;
  status: string;
  priority: string;
  description: string;
  starting: Date;
  ending: Date;
  userId: number;
  project: Project;
  dependencies: Dependency[];
  comments: Comment[];
  activities: Activity[];
  id?: number;

  constructor() {
    this.name = '';
    this.status = '';
    this.priority = '';
    this.description = '';
    this.starting = new Date();
    this.ending = new Date();
    this.userId = 0;
    this.project = {} as Project;
    this.dependencies = [];
    this.comments = [];
    this.activities = [];
    this.id = undefined;
  }

  // Parameterized constructor
  // constructor(
  //   name: string,
  //   status: string,
  //   priority: string,
  //   description: string,
  //   starting: Date,
  //   ending: Date,
  //   userId: number,
  //   project: Project,
  //   dependencies: Dependency[],
  //   comments: Comment[],
  //   activities: Activity[],
  //   id?: number
  // ) {
  //   this.name = name;
  //   this.status = status;
  //   this.priority = priority;
  //   this.description = description;
  //   this.starting = starting;
  //   this.ending = ending;
  //   this.userId = userId;
  //   this.project = project;
  //   this.dependencies = dependencies;
  //   this.comments = comments;
  //   this.activities = activities;
  //   this.id = id;
  // }
}
