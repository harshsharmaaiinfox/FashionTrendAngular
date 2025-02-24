import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdatePassword } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { SettingState } from '../../../shared/state/setting.state';
import { Values } from '../../../shared/interface/setting.interface';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;

  public form: FormGroup;
  public email: string;
  public token: any;
  public breadcrumb: Breadcrumb = {
    title: "Reset Password",
    items: [{ label: 'Reset Password', active: true }]
  }

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public  router: Router
  ) {
    this.email = this.store.selectSnapshot(state => state.auth.email);
    this.token = this.store.selectSnapshot(state => state.auth.token);
    if(!this.email && !this.token) this.router.navigateByUrl('/auth/login');
    this.form = this.formBuilder.group({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(
          new UpdatePassword({
            email: this.email,
            token: this.token,
            password: this.form.value.newPassword,
            password_confirmation: this.form.value.confirmPassword,
          })
      ).subscribe(
        {
          complete: () => { 
            this.router.navigateByUrl('/auth/login'); 
          }     
        }
      );
    }
  }

}
