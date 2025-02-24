import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel';

@Component({
  selector: 'app-theme-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  @Input() style: string = 'horizontal';
  @Input() class: string | null;
  @Input() contentClass: string;
  @Input() banners: any;

  public bannerSlider = data.bannerSlider;

}
