import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../interface/product.interface';
import { AddToWishlist, DeleteWishlist } from '../../../../action/wishlist.action';
import { WishlistState } from '../../../../state/wishlist.state';
import { ThemeOptionService } from '../../../../services/theme-option.service';

@Component({
  selector: 'app-digital-product-box',
  templateUrl: './digital-product-box.component.html',
  styleUrl: './digital-product-box.component.scss'
})
export class DigitalProductBoxComponent {
  
  @Input() class: string;
  @Input() close: boolean;
  @Input() product: Product;
   
  @Select(WishlistState.wishlistIds) wishlistIds$: Observable<number[]>;
  
  public wishlistIds: number[];
 
  constructor(private store: Store, public themeOptionService: ThemeOptionService){}

  ngOnInit(){
  }

  addToWishlist(product: Product){
    product['is_wishlist'] = !product['is_wishlist'];
    let action = product['is_wishlist']? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }
}
