import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel'
import { Bundles } from '../../../../shared/interface/theme.interface';

@Component({
  selector: 'app-theme-collection ',
  templateUrl: './collection .component.html',
  styleUrls: ['./collection .component.scss']
})
export class CollectionComponent {

  @Input() data: Bundles[];

  public bannerSlider = data.bannerSlider;

}
