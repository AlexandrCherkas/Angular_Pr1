import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationShellComponent } from './pages/registration-shell/registration-shell.component';
import { LoginShellComponent } from './pages/login-shell/login-shell.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { AuthRoutingModule } from './authorization-routing.module';



@NgModule({
  declarations: [
    RegistrationShellComponent,
    LoginShellComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    // AuthRoutingModule
  ]
})
export class AuthorizationModule { }
