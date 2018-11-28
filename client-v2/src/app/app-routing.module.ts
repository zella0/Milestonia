import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../app/services/auth.guard';

import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';

import { SidebarComponent } from '../app/sidebar/sidebar.component';
import { OrganizationComponent } from '../app/organization/organization.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},  
  { path: 'organization/:org_id', component: OrganizationComponent, canActivate: [AuthGuard] },
  
  { path: 'login', component: LoginComponent, pathMatch:"full" },
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
