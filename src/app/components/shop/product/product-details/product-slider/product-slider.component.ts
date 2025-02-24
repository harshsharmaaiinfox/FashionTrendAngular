import { Component, Input } from '@angular/core';
import { Product } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import * as data from  '../../../../../shared/data/owl-carousel';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  public productSliderLayout = data.productSliderLayout;
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
}
