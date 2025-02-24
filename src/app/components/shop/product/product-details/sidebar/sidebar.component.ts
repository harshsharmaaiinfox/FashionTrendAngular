import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { Product } from '../../../../../shared/interface/product.interface';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-product-details-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class ProductSidebarComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;
  
  @Input() product: Product;
  
  public storageURL = environment.storageURL;
}
