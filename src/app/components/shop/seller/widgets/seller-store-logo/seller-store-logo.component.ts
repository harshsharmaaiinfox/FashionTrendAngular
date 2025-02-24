import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
  selector: 'app-seller-store-logo',
  templateUrl: './seller-store-logo.component.html',
  styleUrls: ['./seller-store-logo.component.scss']
})
export class SellerStoreLogoComponent {

  @Input() store: Stores;

}
