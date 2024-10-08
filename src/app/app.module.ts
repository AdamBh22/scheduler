import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgOptimizedImage } from '@angular/common';

import { AppComponent } from './app.component';
import { LnavbarComponent } from './pages/lnavbar/lnavbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectTableComponent } from './pages/project-table/project-table.component';
import { ProjectGanttComponent } from './pages/project-gantt/project-gantt.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { NewProjectModalComponent } from './pages/sidebar/new-project-modal/new-project-modal.component';
import { OptionsModalComponent } from './pages/sidebar/options-modal/options-modal.component';
import { NewTaskModalComponent } from './pages/sidebar/new-task-modal/new-task-modal.component';
import { UserProfileModalComponent } from './pages/navbar/user-profile-modal/user-profile-modal.component';
import { TaskModalComponent } from './pages/task-modal/task-modal.component';
import { NewDependencyModalComponent } from './pages/task-modal/new-dependency-modal/new-dependency-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LnavbarComponent,
    LoginComponent,
    SignupComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    ProjectTableComponent,
    ProjectGanttComponent,
    CalendarComponent,
    NewProjectModalComponent,
    OptionsModalComponent,
    NewTaskModalComponent,
    UserProfileModalComponent,
    TaskModalComponent,
    NewDependencyModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
