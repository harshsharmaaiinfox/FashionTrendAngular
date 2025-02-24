import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/interface/product.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ThemeOptionState } from '../../../state/theme-option.state';
import { Option } from '../../../interface/theme-option.interface';
import { ThemeOptionService } from '../../../services/theme-option.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent {
  
  @Input() product: Product;
  @Input() style: string  = 'horizontal';
  @Input() class: string;
  @Input() close: boolean = false;

  public variant: string;
  public theme: string;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  constructor(public themeOptionService: ThemeOptionService){}


}
