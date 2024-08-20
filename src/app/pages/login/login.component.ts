import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email:'',
    password:''
  }
  constructor(private router: Router) {}
  onSubmit() {
    console.log('Login data:', this.loginData);
  }
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
