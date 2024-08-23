import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppUserProject} from "../models/AppUserProject.model";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppUserProjectService {

  constructor(protected httpClient: HttpClient) {
  }
  private baseURL = 'http://localhost:8080';

  addAppUserProject(appUserProject:AppUserProject): Observable<AppUserProject> {
    return this.httpClient.post<AppUserProject>(`${this.baseURL}/users/projects`, appUserProject).pipe(catchError(this.errorHandl));
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
