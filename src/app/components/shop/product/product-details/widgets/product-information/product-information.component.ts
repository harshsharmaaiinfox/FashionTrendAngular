import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent {

  @Input() product: Product | null;

}
