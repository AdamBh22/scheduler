import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, throwError} from 'rxjs';
import { Project } from '../models/project.model';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private Url = 'http://localhost:8080';
  constructor(protected httpClient: HttpClient) {
  }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.Url}/projects`).pipe(catchError(this.errorHandl));
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return this.httpClient.get<Project>(`${this.Url}/projects/${id}`).pipe(catchError(this.errorHandl));
  }

  addProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(`${this.Url}/projects`, project).pipe(catchError(this.errorHandl));
  }

  deleteProject(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.Url}/projects/${id}`).pipe(catchError(this.errorHandl));
  }

  getProjectByUserId(id: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.Url}/users/projectsByUser/${id}`).pipe(catchError(this.errorHandl));
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
