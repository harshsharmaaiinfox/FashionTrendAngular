import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { StoreService } from '../../../../../shared/services/store.service';

@Component({
  selector: 'app-seller-store-classic',
  templateUrl: './seller-store-classic.component.html',
  styleUrls: ['./seller-store-classic.component.scss']
})
export class SellerStoreClassicComponent {

  @Input() stores: Stores[];
  @Input() skeletonItems: number[];

  constructor(public storeService: StoreService) { }
  
}
