import { Component, Input } from '@angular/core';
import { Product } from '../../../../../shared/interface/product.interface';

@Component({
  selector: 'app-product-box-vertical',
  templateUrl: './product-box-vertical.component.html',
  styleUrls: ['./product-box-vertical.component.scss']
})
export class ProductBoxVerticalComponent {

  @Input() product: Product;

}
