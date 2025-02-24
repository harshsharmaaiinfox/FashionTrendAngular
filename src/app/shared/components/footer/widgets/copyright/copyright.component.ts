import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-footer-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent {

  @Input() data: Option | null;

}
