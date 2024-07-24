import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {LnavbarComponent} from "./pages/lnavbar/lnavbar.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
import {HomeComponent} from "./pages/home/home.component";
import {ProjectTableComponent} from "./pages/project-table/project-table.component";
import {ProjectGanttComponent} from "./pages/project-gantt/project-gantt.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {TaskModalComponent} from "./pages/task-modal/task-modal.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'lnavbar',
    component:LnavbarComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'projectTable',
    component: ProjectTableComponent
  },
  {
    path: 'projectGantt',
    component: ProjectGanttComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path:'taskModal',
    component: TaskModalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
