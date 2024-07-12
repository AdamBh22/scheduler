import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component'
import {FormsModule} from "@angular/forms";
import { SignupComponent } from './pages/signup/signup.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [ HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
