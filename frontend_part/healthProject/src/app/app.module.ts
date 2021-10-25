import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { ServicesComponent } from './services/services.component';
import { MainpageComponent } from './mainpage/mainpage.component';

import { FormsModule } from '@angular/forms';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// http module
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';

// ngx-countdown .
import { CountdownModule } from 'ngx-countdown';
CountdownModule
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PatientsComponent,
    ServicesComponent,
    MainpageComponent,
    TaskComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    CountdownModule  // count down module .
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
