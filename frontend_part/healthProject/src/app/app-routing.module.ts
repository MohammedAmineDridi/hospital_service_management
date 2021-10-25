import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PatientsComponent } from './patients/patients.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  {path:'',component:MainpageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'patients',component:PatientsComponent},
  {path:'services',component:ServicesComponent},
  {path:'tasks/:id',component:TaskComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [LoginComponent,RegisterComponent,PatientsComponent,ServicesComponent,DashboardComponent,MainpageComponent] 
  