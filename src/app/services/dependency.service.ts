import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Dependency} from "../models/dependency.model";

@Injectable({
  providedIn: 'root'
})
export class DependencyService {
  constructor(protected httpClient: HttpClient) {
  }
  private baseURL = 'http://localhost:8080';

  getDependencyByTaskId(id:number): Observable<Dependency[]> {
    return this.httpClient.get<Dependency[]>(`${this.baseURL}/dependencies/task/${id}`).pipe(catchError(this.errorHandl));
  }
  deleteDependency(id:number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/dependencies/${id}`).pipe(catchError(this.errorHandl));
  }

  addDependency(dependency: Dependency): Observable<Dependency> {
    return this.httpClient.post<Dependency>(`${this.baseURL}/dependencies`, dependency).pipe(catchError(this.errorHandl));
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
