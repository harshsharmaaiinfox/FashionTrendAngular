import { Component, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import * as data from  '../../../../shared/data/owl-carousel';
import { AttributeService } from '../../../../shared/services/attribute.service';

@Component({
  selector: 'app-collection-category-slider',
  templateUrl: './collection-category-slider.component.html',
  styleUrls: ['./collection-category-slider.component.scss']
})
export class CollectionCategorySliderComponent {

  @Input() filter: Params;

  public categorySlider = data.categorySlider;

  constructor(public attributeService: AttributeService) {}

}
