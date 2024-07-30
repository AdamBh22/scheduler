import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Project } from '../models/project.model';
import {Task} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    new Project(1, 'Project 1', [
      new Task(1, 'Task 1', 'To Do', 'High', 'User1', new Date('2024-07-19'), new Date('2024-07-24'), [], '', [], [], 1),
      new Task(2, 'Task 2', 'In Progress', 'Medium', 'User2', new Date('2024-07-20'), new Date('2024-07-27'), [], '', [], [], 1)
    ]),
    new Project(2, 'Project 2', [
      new Task(3, 'Task 3', 'Complete', 'Low', 'User3', new Date('2024-07-21'), new Date('2024-07-30'), [], '', [], [], 2)
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
}
