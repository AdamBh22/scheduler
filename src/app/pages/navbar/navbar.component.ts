import { AfterViewInit, Component } from '@angular/core';
import { Router } from "@angular/router";
import { Modal } from "bootstrap";
import * as bootstrap from "bootstrap";
import { User } from "../../models/user.model"
import {UserService} from "../../services/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  username: string = 'john'; // This should be fetched from user service
  user=new User(1,'','','','',[],[]);

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(1).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching user', error);
      },
      complete: () => {
      }
    });
  }
  openProfileModal(event: Event): void {
    event.preventDefault();
    const modalElement = document.getElementById('userProfileModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }
  populateModal() {
    const modalBody = document.querySelector('#userProfileModal .modal-body');
    if (modalBody && this.user) {
      modalBody.innerHTML = `
        <p><strong>Full Name:</strong> ${this.user.fullName}</p>
        <p><strong>Email:</strong> ${this.user.email}</p>
        <p><strong>Role:</strong> ${this.user.role}</p>
      `;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
