import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-lnavbar',
  templateUrl: './lnavbar.component.html',
  styleUrls: ['./lnavbar.component.scss']
})
export class LnavbarComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isSignInPage(): boolean {
    return this.router.url === '/signup';
  }

}
