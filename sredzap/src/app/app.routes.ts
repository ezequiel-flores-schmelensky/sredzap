import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'login/success',component: AuthComponent,},
   {path: 'dashboard'    ,component: DashboardComponent,}  
];
