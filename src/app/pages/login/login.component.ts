import { Component } from '@angular/core';

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
  onSubmit() {
    console.log('Login data:', this.loginData);
  }
}
