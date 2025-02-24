import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Product } from '../../../../interface/product.interface';
import { DeleteWishlist } from '../../../../action/wishlist.action';

@Component({
  selector: 'app-standard-product-box',
  templateUrl: './standard-product-box.component.html',
  styleUrl: './standard-product-box.component.scss'
})
export class StandardProductBoxComponent {
  
  @Input() product: Product;
  @Input() class: string;
  @Input() close: boolean;
 
  constructor(config: NgbRatingConfig, private store: Store) {
		config.max = 5; 
		config.readonly = true;
	}

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }

}
