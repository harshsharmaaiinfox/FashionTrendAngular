import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent {

  @Input() data: Option | null;
  @Input() style: string = 'basic';
  
}
