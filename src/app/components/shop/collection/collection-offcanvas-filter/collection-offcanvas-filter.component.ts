import { Component, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';

@Component({
  selector: 'app-collection-offcanvas-filter',
  templateUrl: './collection-offcanvas-filter.component.html',
  styleUrls: ['./collection-offcanvas-filter.component.scss']
})
export class CollectionOffCanvasFilterComponent {

  @Input() filter: Params;

  constructor(public attributeService: AttributeService) {
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }
  
}
