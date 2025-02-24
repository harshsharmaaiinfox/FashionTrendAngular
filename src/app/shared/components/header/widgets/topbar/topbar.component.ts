import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  @Input() data: Option | null;

}
