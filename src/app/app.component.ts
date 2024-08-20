import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gantt_Chart';
  constructor(private router: Router) {}
  isNotSignInLoginPage(): boolean {
    return this.router.url != '/signup' && this.router.url !='/login';
  }
}
