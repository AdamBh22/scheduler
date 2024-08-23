import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(protected httpClient: HttpClient) {}

  private baseURL = 'http://localhost:8080';

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users`).pipe(
      catchError(this.errorHandl)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/users/${id}`).pipe(
      catchError(this.errorHandl)
    );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/users/add`, user).pipe(
      catchError(this.errorHandl)
    );
  }

  updateUser(user: User, id: number): Observable<User> {
    return this.httpClient.put<User>(`${this.baseURL}/users/${id}`, user).pipe(
      catchError(this.errorHandl)
    );
  }

  getUsersByProject(projectId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/projects/usersByProject/${projectId}`).pipe(
      catchError(this.errorHandl)
    );
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
