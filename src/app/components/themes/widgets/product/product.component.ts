import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';
import { Product } from '../../../../shared/interface/product.interface';
import { ProductState } from '../../../../shared/state/product.state';
import * as data from '../../../../shared/data/owl-carousel';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { Option } from '../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-theme-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() style: string = 'vertical';
  @Input() productIds: number[] = [];
  @Input() boxClass: string;
  @Input() productStyle: string='';
  @Input() layout: string;
  @Input() sliderOption: OwlOptions = data.productSlider;
  @Input() slider: boolean;
  @Input() showItem: number;

  public products: Product[] = [];

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  @Select(ProductState.productByIds) product$: Observable<Product[]>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  constructor(public productService: ProductService) {
  }

  ngOnChanges() {
    if (Array.isArray(this.productIds) && this.productIds.length) {
      this.product$.subscribe(products => {
        this.products = products.filter(product => this.productIds?.includes(product.id));
      });
    }
  }

  ngOnInit(){
    this.themeOption$.subscribe(option => {
      if(option?.product?.product_box_border || option?.product?.image_bg || option?.product?.product_box_bg) {
        this.sliderOption['margin'] = 15
      }
    })
  }
 
}
