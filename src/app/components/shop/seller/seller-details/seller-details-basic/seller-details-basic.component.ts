import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../../shared/interface/core.interface';
import { Stores } from '../../../../../shared/interface/store.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-seller-details-basic',
  templateUrl: './seller-details-basic.component.html',
  styleUrls: ['./seller-details-basic.component.scss']
})
export class SellerDetailsBasicComponent {

  @Input() filter: Params;
  @Input() store: Stores;
  
  public storageURL = environment.storageURL;

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

}
