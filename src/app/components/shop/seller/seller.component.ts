import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Become Seller",
    items: [{ label: 'Become Seller', active: true }]
  }
  public storageURL = environment.storageURL;
  public data?: Option;

  constructor(){
    this.themeOption$.subscribe(data => this.data = data);
  }

}
