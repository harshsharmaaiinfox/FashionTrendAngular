import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-footer-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {

  @Input() data: Option | null;

}
