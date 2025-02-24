import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
  selector: 'app-seller-store-product-counts',
  templateUrl: './seller-store-product-counts.component.html',
  styleUrls: ['./seller-store-product-counts.component.scss']
})
export class SellerStoreProductCountsComponent {

  @Input() store: Stores;

}
