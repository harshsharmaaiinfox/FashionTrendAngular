import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import {
  RecaptchaModule,
  RecaptchaFormsModule
} from 'ng-recaptcha';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginWithNumberComponent } from './login-with-number/login-with-number.component';

import { AuthState } from '../../shared/state/auth.state';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    OtpComponent,
    UpdatePasswordComponent,
    RegisterComponent,
    LoginWithNumberComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxsModule.forFeature([AuthState]),
    TranslateModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class AuthModule { }
