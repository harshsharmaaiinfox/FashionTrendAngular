import { Component, Input } from '@angular/core';
import { Product } from '../../../interface/product.interface';

@Component({
  selector: 'app-breadcrumb-digital',
  templateUrl: './breadcrumb-digital.component.html',
  styleUrl: './breadcrumb-digital.component.scss'
})
export class BreadcrumbDigitalComponent {

  @Input() product: Product;
}
