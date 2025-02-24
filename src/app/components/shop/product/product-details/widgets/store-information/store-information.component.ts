import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../../shared/interface/store.interface';

@Component({
  selector: 'app-store-information',
  templateUrl: './store-information.component.html',
  styleUrls: ['./store-information.component.scss']
})
export class StoreInformationComponent {

  @Input() store: Stores | null;

}
