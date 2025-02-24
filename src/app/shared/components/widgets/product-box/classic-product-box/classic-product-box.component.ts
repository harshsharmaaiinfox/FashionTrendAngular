import { Component, Input } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { DeleteWishlist } from '../../../../action/wishlist.action';

@Component({
  selector: 'app-classic-product-box',
  templateUrl: './classic-product-box.component.html',
  styleUrl: './classic-product-box.component.scss'
})
export class ClassicProductBoxComponent {
  
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
