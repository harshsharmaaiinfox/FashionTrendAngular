import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart } from '../../../interface/cart.interface';
import { CartState } from '../../../state/cart.state';

@Component({
  selector: 'app-sticky-cart',
  templateUrl: './sticky-cart.component.html',
  styleUrls: ['./sticky-cart.component.scss']
})
export class StickyCartComponent {

  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(CartState.cartTotal) cartTotal$: Observable<number>;
  @Select(CartState.stickyCart) stickyCart$: Observable<boolean>;

  public isOpen: boolean;

  constructor() {
    this.stickyCart$.subscribe(value => this.isOpen = value);
  }

  openCart(isOpen: boolean) {
    this.isOpen = isOpen;
  }

}
