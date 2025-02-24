import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;
  public storageURL = environment.storageURL;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = this.storageURL + res?.collection?.collection_banner_image_url);
  }
}
