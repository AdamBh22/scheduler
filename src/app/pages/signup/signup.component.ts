import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupData = {
    fullName:'',
    email:'',
    role:'',
    password:'',
    confirmPassword:''
  }
  get confirmPasswordInvalid(){
    return this.signupData.confirmPassword!==this.signupData.password;
  }
  onSubmit(){
    if (this.signupData.password === this.signupData.confirmPassword) {
      console.log('Signup data:', this.signupData);
    } else {
      console.error('Passwords do not match');
    }
  }
}
