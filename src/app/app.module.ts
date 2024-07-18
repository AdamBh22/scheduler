import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectTableComponent } from './pages/project-table/project-table.component';
import { ProjectGanttComponent } from './pages/project-gantt/project-gantt.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { NewProjectModalComponent } from './pages/sidebar/new-project-modal/new-project-modal.component';

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
    ProjectsComponent,
    ProjectTableComponent,
    ProjectGanttComponent,
    CalendarComponent,
    NewProjectModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
