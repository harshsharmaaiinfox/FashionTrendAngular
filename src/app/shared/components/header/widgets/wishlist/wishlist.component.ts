import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WishlistModel } from '../../../../interface/wishlist.interface';
import { WishlistState } from '../../../../state/wishlist.state';

@Component({
  selector: 'app-header-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  @Input() style: string = 'basic';

  @Select(WishlistState.wishlistItems) wishlist$: Observable<WishlistModel>;

}
