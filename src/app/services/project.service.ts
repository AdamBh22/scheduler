import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Project } from '../models/project.model';
import {Task} from "../models/task.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    new Project(1, 'Project 1', [
      new Task(1, 'Task 1', 'To Do', 'High', new Date('2024-07-19'), new Date('2024-07-24'), [], '', [], [], 1),
      new Task(2, 'Task 2', 'In Progress', 'Medium', new Date('2024-07-20'), new Date('2024-07-27'), [], '', [], [], 1)
    ]),
    new Project(2, 'Project 2', [
      new Task(3, 'Task 3', 'Complete', 'Low', new Date('2024-07-21'), new Date('2024-07-30'), [], '', [], [], 2)
    ]),
    new Project(3, 'Project 3', [
      new Task(4, 'Task 4', 'Complete', 'Low', new Date('2024-07-21'), new Date('2024-07-30'), [], '', [], [], 3),
      new Task(5, 'Task 5', 'In Progress', 'Middle', new Date('2024-07-21'), new Date('2024-08-11'), [], '', [], [], 3)
    ]),
    new Project(4, 'Project 4', [
      new Task(4, 'Task 4', 'Complete', 'Low', new Date('2024-07-21'), new Date('2024-07-30'), [], '', [], [], 3),
      new Task(5, 'Task 5', 'In Progress', 'Middle', new Date('2024-07-21'), new Date('2024-08-11'), [], '', [], [], 3)
    ]),
    new Project(5, 'Project 5', [
      new Task(4, 'Task 4', 'Complete', 'Low', new Date('2024-07-21'), new Date('2024-07-30'), [], '', [], [], 3),
      new Task(5, 'Task 5', 'In Progress', 'Middle', new Date('2024-07-21'), new Date('2024-08-11'), [], '', [], [], 3)
    ])
  ];
  taskAdded: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  constructor() {}

  getAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return of(this.projects.find(project => project.id === id));
  }
  addTaskToProject(projectId: number, task: Task): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.tasks.push(task);
      this.taskAdded.next();
    } else {
      console.error('Project not found');
    }
  }
  addUserToProject(projectId: number, user: User): void {
    const project = this.projects.find(p => p.id === projectId);
    if(project){
      project.users.push(user);
    }
    else{
      console.error('Project not found');
    }
  }
}
