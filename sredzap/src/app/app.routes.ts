import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
   {path: 'login/success',component: AuthComponent,},
   {path: 'dashboard',component: DashboardComponent,}  
];
