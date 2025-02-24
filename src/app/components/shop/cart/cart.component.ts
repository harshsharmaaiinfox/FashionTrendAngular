import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { CartState } from '../../../shared/state/cart.state';
import { UpdateCart, DeleteCart } from '../../../shared/action/cart.action';
import { AddToWishlist } from '../../../shared/action/wishlist.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(CartState.cartTotal) cartTotal$: Observable<number>;
  @Select(CartState.cartHasDigital) cartDigital$: Observable<boolean | number>;
  
  public breadcrumb: Breadcrumb = {
    title: "Cart",
    items: [{ label: 'Cart', active: true }]
  }

  constructor(private store: Store) {}

  updateQuantity(item: Cart, qty: number) {
    const params: CartAddOrUpdate = {
      id: item?.id,
      product: item?.product,
      product_id: item?.product?.id,
      variation: item?.variation,
      variation_id: item?.variation_id ? item?.variation_id : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  addToWishlist(item: Cart) {
    this.store.dispatch(new AddToWishlist({ product_id: item.product.id })).subscribe({
      complete: () => {
        this.delete(item.id);
      }
    });
  }

  delete(id: number) {
    this.store.dispatch(new DeleteCart(id));
  }

}
