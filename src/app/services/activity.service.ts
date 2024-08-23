import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Activity} from "../models/activity.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(protected httpClient: HttpClient) {
  }
  private baseURL = 'http://localhost:8080';

  getActivitiesByTaskId (taskId:number): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${this.baseURL}/activities/task/${taskId}`).pipe(catchError(this.errorHandl));
  }
  getUserByActivityId(id:number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/activities/user/${id}`).pipe(catchError(this.errorHandl));
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
