import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-footer-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  @Input() data: Option | null;

}
