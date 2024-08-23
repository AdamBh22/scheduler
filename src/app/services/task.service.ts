import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import {catchError, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getUserTasks(userId:number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks/user/${userId}`).pipe(catchError(this.errorHandl));
  }

  getTasksByStatus(status: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks/status/${status}`).pipe(catchError(this.errorHandl));
  }

  getTasksForToday(userId:number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasksForToday/${userId}`).pipe(catchError(this.errorHandl));
  }
  getTaskById(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/tasks/${taskId}`).pipe(catchError(this.errorHandl));
  }
  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task).pipe(catchError(this.errorHandl));
  }
  updateTask(task: Task,taskid:number): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/tasks/${taskid}`, task).pipe(catchError(this.errorHandl));
  }
  deleteTask(taskId:number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/tasks/${taskId}`).pipe(catchError(this.errorHandl));
  }

  getRelatedTask(id:number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/dependencies/relatedTask/${id}`).pipe(catchError(this.errorHandl));
  }

  private errorHandl(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
