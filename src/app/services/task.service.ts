import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    new Task(1, 'Task 1', 'Late', 'High', 'User1', new Date(2024, 6, 1), new Date(2024, 6, 5), [], '', [], [], 1),
    new Task(2, 'Task 2', 'Complete', 'Medium', 'User1', new Date(2024, 6, 3), new Date(2024, 6, 7), [], '', [], [], 1),
    new Task(3, 'Task 3', 'Next', 'Low', 'User1', new Date(2024, 6, 5), new Date(2024, 8, 10), [], '', [], [], 1)
  ];

  constructor() { }

  getUserTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTasksByStatus(status: string): Observable<Task[]> {
    const filteredTasks = this.tasks.filter(task => task.status === status);
    return of(filteredTasks);
  }

  getTasksForToday(): Observable<Task[]> {
    const today = new Date();
    const tasksForToday = this.tasks.filter(task => {
      const startDate = new Date(task.starting);
      const endDate = new Date(task.ending);
      return startDate <= today && today <= endDate;
    });
    return of(tasksForToday);
  }
}
