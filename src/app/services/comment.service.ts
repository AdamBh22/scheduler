import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Comment} from "../models/comment.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(protected httpClient: HttpClient) {
  }
  private baseURL = 'http://localhost:8080';

  addComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseURL}/comments`, comment).pipe(catchError(this.errorHandl));
  }

  getCommentByTaskId(id:number): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.baseURL}/comments/task/${id}`).pipe(catchError(this.errorHandl));
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
