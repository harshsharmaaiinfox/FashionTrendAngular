import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-product-box',
  templateUrl: './skeleton-product-box.component.html',
  styleUrls: ['./skeleton-product-box.component.scss']
})
export class SkeletonProductBoxComponent {

  @Input() style: string = 'horizontal';
  
}
