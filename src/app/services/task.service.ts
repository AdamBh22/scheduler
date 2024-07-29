import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    new Task(1, 'Task 1', 'In Progress', 'High', 'User1', new Date(2024, 6, 1), new Date(2024, 6, 5), [], '', [], [], 1),
    new Task(2, 'Task 2', 'Complete', 'Medium', 'User1', new Date(2024, 6, 3), new Date(2024, 6, 7), [], '', [], [], 1),
    new Task(3, 'Task 3', 'To Do', 'Low', 'User1', new Date(2024, 6, 5), new Date(2024, 6, 10), [], '', [], [], 1)
  ];

  constructor() { }

  getUserTasks(): Observable<Task[]> {
    console.log('Loaded tasks:', this.tasks); // Add this line
    return of(this.tasks);
  }
}
