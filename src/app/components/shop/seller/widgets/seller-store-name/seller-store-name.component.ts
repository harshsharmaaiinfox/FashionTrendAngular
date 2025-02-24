import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
  selector: 'app-seller-store-name',
  templateUrl: './seller-store-name.component.html',
  styleUrls: ['./seller-store-name.component.scss']
})
export class SellerStoreNameComponent {

  @Input() store: Stores;
  
}
