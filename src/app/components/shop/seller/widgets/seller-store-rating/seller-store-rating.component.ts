import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
  selector: 'app-seller-store-rating',
  templateUrl: './seller-store-rating.component.html',
  styleUrls: ['./seller-store-rating.component.scss']
})
export class SellerStoreRatingComponent {

  @Input() store: Stores;

}
