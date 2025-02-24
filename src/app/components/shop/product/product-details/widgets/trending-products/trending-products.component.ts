import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../../shared/state/product.state';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss']
})
export class TrendingProductsComponent {

  @Select(ProductState.relatedProducts) relatedProduct$: Observable<Product[]>;

  public relatedProducts: Product[] = [];

  ngOnInit() {
    this.relatedProduct$.subscribe(products => {
      this.relatedProducts = products?.length ? products?.filter(product => product?.is_trending) : [];
    });
  }
}
