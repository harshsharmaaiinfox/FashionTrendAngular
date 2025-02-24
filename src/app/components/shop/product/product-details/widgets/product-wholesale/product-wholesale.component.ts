import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';

@Component({
  selector: 'app-product-wholesale',
  templateUrl: './product-wholesale.component.html',
  styleUrl: './product-wholesale.component.scss'
})
export class ProductWholesaleComponent {

  @Input() product: Product | null;

}
