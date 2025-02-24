import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.component.html',
  styleUrls: ['./payment-option.component.scss']
})
export class PaymentOptionComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  public storageURL = environment.storageURL;

}
