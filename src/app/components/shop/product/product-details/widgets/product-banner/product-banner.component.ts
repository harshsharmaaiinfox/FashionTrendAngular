import { Component, Input, SimpleChanges } from '@angular/core';
import { Link } from '../../../../../../shared/interface/theme.interface';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss']
})
export class ProductBannerComponent {

  @Input() image: string | undefined;

  public banner: Link;

  ngOnChanges(change: SimpleChanges){
    if(change['image']) {
      let img = change['image']?.currentValue;
      this.banner = {
        redirect_link: {
          link_type: 'collection',
          link: 'vegetables-fruits'
        },
        image_url: img
      }
    }
  }
}
