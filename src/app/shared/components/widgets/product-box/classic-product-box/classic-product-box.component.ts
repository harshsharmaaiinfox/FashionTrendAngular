import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { DeleteWishlist } from '../../../../action/wishlist.action';

@Component({
  selector: 'app-classic-product-box',
  templateUrl: './classic-product-box.component.html',
  styleUrl: './classic-product-box.component.scss'
})
export class ClassicProductBoxComponent implements OnInit {
  
  @Input() product: Product;
  @Input() class: string;
  @Input() close: boolean;
  
  constructor(config: NgbRatingConfig, private store: Store) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    if (!this.product.rating_count || this.product.rating_count < 3) {
      this.product.rating_count = parseFloat((Math.random() * (5 - 3) + 3).toFixed(1));
    }
  }

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }
}
