import { Injectable } from '@angular/core';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = new User('john.doe@example.com', 'John Doe', 'Project Manager', 'password');

  getUser(): User {
    return this.user;
  }
}
