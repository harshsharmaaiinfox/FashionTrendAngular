import { Component, Input } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { Footer } from '../../../../shared/interface/theme.interface';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from '../../../action/subscription.action';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-subscribe-footer',
  templateUrl: './subscribe-footer.component.html',
  styleUrl: './subscribe-footer.component.scss'
})
export class SubscribeFooterComponent {

  @Input() data: Option | null;
  @Input() footer: Footer;

  public email = new FormControl('', [Validators.required, Validators.email]);
  public storageURL = environment.storageURL;

  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false
  };

  constructor(private store: Store){}

  getText(text: string): string{
    const words = text.split(' ');
    const firstTwoWords = words.slice(0, 2)?.join(' ');
    const remainingText = words.slice(2)?.join(' ');
    return `<h2>${firstTwoWords} <span>${remainingText}</span></h2>`
  }

  toggle(value: string){
    this.active[value] = !this.active[value];
  }

  submit(){
    if(this.email.valid){
      this.store.dispatch(new Subscription({email: this.email.value!}))
      this.email.reset();
    }
  }
}
