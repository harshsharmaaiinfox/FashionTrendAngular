import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ContactUs } from '../../../shared/action/page.action';
import { Option, Contact } from '../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Contact Us",
    items: [{ label: 'Contact Us', active: true }]
  }

  public form: FormGroup;
  public contactData: Contact;
  public storageURL = environment.storageURL;

  constructor(private formBuilder: FormBuilder,
    private store: Store){
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    })

    this.themeOption$.subscribe(data => this.contactData = data.contact_us)
  }

  submit(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(new ContactUs(this.form.value)).subscribe({
        complete: ()=>{
          this.form.reset();
        }
      })
    }
  }
}
