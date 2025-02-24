import { Component, Input, SimpleChange } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../shared/interface/core.interface';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-collection-no-sidebar',
  templateUrl: './collection-no-sidebar.component.html',
  styleUrls: ['./collection-no-sidebar.component.scss']
})
export class CollectionNoSidebarComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;
  public storageURL = environment.storageURL;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = this.storageURL + res?.collection?.collection_banner_image_url);
  }

}
