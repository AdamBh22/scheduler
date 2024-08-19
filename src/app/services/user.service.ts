import { Injectable } from '@angular/core';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User=new User(1,'john.doe@example.com', 'John Doe', 'Project Manager', 'password', [], []);
  private users: User[] = [
    new User(1,'john.doe@example.com', 'John Doe', 'Project Manager', 'password', [], []),
    new User(2,'jane.smith@example.com', 'Jane Smith', 'Developer', 'password', [], []),

  ];

  getUserById(userId: number): User | undefined {
    return this.users.find(user => user.id == userId);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email == email);
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser():User{
    return this.user;
  }
}
