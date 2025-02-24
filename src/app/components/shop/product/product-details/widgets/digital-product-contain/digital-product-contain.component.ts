import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';

@Component({
  selector: 'app-digital-product-contain',
  templateUrl: './digital-product-contain.component.html',
  styleUrl: './digital-product-contain.component.scss'
})
export class DigitalProductContainComponent {

  @Input() product: Product;

}
