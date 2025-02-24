import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { ForgotPassWord } from "../../../shared/action/auth.action";
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { SettingState } from '../../../shared/state/setting.state';
import { Values } from '../../../shared/interface/setting.interface';
import { ThemeOptionState } from "../../../shared/state/theme-option.state";
import { Option } from "../../../shared/interface/theme-option.interface";
import { OtpComponent } from "../otp/otp.component";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  
  public form: FormGroup;
  public breadcrumb: Breadcrumb = {
    title: "Forgot Password",
    items: [{ label: 'Forgot Password', active: true }]
  }
  public reCaptcha: boolean = true;

  constructor(private store: Store, 
    public router: Router, 
    public authService: AuthService, 
    public formBuilder: FormBuilder ) {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      recaptcha: ["", [Validators.required]]
    });
    this.setting$.subscribe(setting => {
      if((setting?.google_reCaptcha && !setting?.google_reCaptcha?.status) || !setting?.google_reCaptcha) {
        this.form.removeControl('recaptcha');
        this.reCaptcha = false;
      } else {
        this.form.setControl('recaptcha', new FormControl(null, Validators.required))
        this.reCaptcha = true;
      }
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(new ForgotPassWord(this.form.value)).subscribe({
        complete: () => { 
          this.authService.otpType = 'email';
          this.router.navigateByUrl('/auth/otp'); 
        }     
      });
    }
  }



}
