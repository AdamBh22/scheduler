import { Injectable } from '@angular/core';
import { Recent } from '../models/recents.model';
import {catchError, Observable, of, throwError} from 'rxjs';
import {UserService} from "./user.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecentsService {

  constructor(protected httpClient: HttpClient) {
  }
  private baseURL = 'http://localhost:8080';

  getRecents(): Observable<Recent[]> {
    return this.httpClient.get<Recent[]>(`${this.baseURL}/recents`).pipe(catchError(this.errorHandl));
  }

  addRecent(recent:Recent): Observable<Recent> {
    return this.httpClient.post<Recent>(`${this.baseURL}/recents`, recent).pipe(catchError(this.errorHandl));
  }

  getRecentsByUserId(id:number): Observable<Recent[]> {
    return this.httpClient.get<Recent[]>(`${this.baseURL}/recents/user/${id}`).pipe(catchError(this.errorHandl));
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
