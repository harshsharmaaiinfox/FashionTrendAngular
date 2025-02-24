import { Component, Input } from '@angular/core';
import { Params } from '../../../../../shared/interface/core.interface';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
  selector: 'app-seller-details-classic',
  templateUrl: './seller-details-classic.component.html',
  styleUrls: ['./seller-details-classic.component.scss']
})
export class SellerDetailsClassicComponent {

  @Input() filter: Params;
  @Input() store: Stores;

}
