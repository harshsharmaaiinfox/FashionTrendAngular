import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { StoreService } from '../../../../../shared/services/store.service';

@Component({
  selector: 'app-seller-store-basic',
  templateUrl: './seller-store-basic.component.html',
  styleUrls: ['./seller-store-basic.component.scss']
})
export class SellerStoreBasicComponent {

  @Input() stores: Stores[];
  @Input() skeletonItems: number[];

  constructor(public storeService: StoreService) { }

}
