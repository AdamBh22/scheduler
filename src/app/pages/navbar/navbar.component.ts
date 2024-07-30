import { AfterViewInit, Component } from '@angular/core';
import { Router } from "@angular/router";
import { Modal } from "bootstrap";
import * as bootstrap from "bootstrap";
import { User } from "../../models/user.model"
import {UserService} from "../../services/user.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  username: string = 'john'; // This should be fetched from user service
  user: User;

  constructor(private router: Router, private userService: UserService) {
    this.user = this.userService.getUser();
    this.username = this.user.fullName.charAt(0);
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

  logout() {
    this.router.navigate(['/login']);
  }
}
