import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';

@Component({
  selector: 'app-product-delivery-information',
  templateUrl: './product-delivery-information.component.html',
  styleUrls: ['./product-delivery-information.component.scss']
})
export class ProductDeliveryInformationComponent {
  
  @Input() product: Product | null;

}
