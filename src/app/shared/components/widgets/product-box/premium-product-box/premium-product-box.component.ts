import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../../interface/product.interface';
import { AddToWishlist, DeleteWishlist } from '../../../../action/wishlist.action';
import { Cart } from '../../../../interface/cart.interface';
import { WishlistState } from '../../../../state/wishlist.state';

@Component({
  selector: 'app-premium-product-box',
  templateUrl: './premium-product-box.component.html',
  styleUrl: './premium-product-box.component.scss'
})
export class PremiumProductBoxComponent {

  @Input() product: Product;
  @Input() class: string;
  @Input() close: boolean;
 
  @Select(WishlistState.wishlistIds) wishlistIds$: Observable<number[]>;

  public cartItem: Cart | null;
  public currentDate: number | null;
  public saleStartDate: number | null;

    
  public wishlistIds: number[];
 
  constructor(private store: Store, config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }

  addToWishlist(product: Product){
    product['is_wishlist'] = !product['is_wishlist'];
    let action = product['is_wishlist']? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }
   
}
