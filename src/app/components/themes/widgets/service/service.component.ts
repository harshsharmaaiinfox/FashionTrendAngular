import { Component, Input } from '@angular/core';
import { Services } from '../../../../shared/interface/theme.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {

  @Input() data: Services[];

  public storageURL = environment.storageURL;
  
}
