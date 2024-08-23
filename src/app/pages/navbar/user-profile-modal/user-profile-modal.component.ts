import { Component } from '@angular/core';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent {
  user: User = new User(1,'', '', '', '',[],[]);
  appUserId:number = 1;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.appUserId).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error: any) => {
        console.error('Error fetching user', error);
      }
    });
  }
}
