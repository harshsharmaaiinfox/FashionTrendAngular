import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-footer-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  @Input() data: Option | null;

  public storageURL = environment.storageURL;

}
