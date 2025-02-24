import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../../shared/state/product.state';
import { ThemeOptionState } from '../../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent {

  @Select(ProductState.relatedProducts) relatedProduct$: Observable<Product[]>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  @Input() product: Product | null;

  public relatedProducts: Product[] = [];

  ngOnChanges() {
    if (this.product?.related_products && Array.isArray(this.product?.related_products)) {
      this.relatedProduct$.subscribe(products => {
        this.relatedProducts = products.filter(product => this.product?.related_products?.includes(product?.id));
      });
    }
  }

}
