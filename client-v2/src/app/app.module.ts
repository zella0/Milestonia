// angular dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

// services dependencies
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { OrgService } from './services/org.service';

// Material CSS libary dependencies
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatSidenavModule,
  MatTabsModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatDividerModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule

} from '@angular/material';

import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewOrgFormComponent } from './new-org-form/new-org-form.component';
import { OrgRewardsComponent } from './org-rewards/org-rewards.component';
import { OrganizationComponent } from './organization/organization.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { RewardFormComponent } from './reward-form/reward-form.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { EditGoalFormComponent } from './edit-goal-form/edit-goal-form.component';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    SidebarComponent,
    NewOrgFormComponent,
    RewardFormComponent,
    OrgRewardsComponent,
    OrganizationComponent,
    RewardFormComponent,
    GoalFormComponent,
    EditGoalFormComponent
  ],
  entryComponents: [NewOrgFormComponent, RewardFormComponent, GoalFormComponent, EditGoalFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    JwtModule,

    // Material modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatSidenavModule,
    MatTabsModule,
    MatGridListModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    ClipboardModule,
    

  ],
  providers: [AuthService, AuthGuard, OrgService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
