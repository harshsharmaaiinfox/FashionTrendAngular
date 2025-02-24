import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-collection-categories',
  templateUrl: './collection-categories.component.html',
  styleUrls: ['./collection-categories.component.scss']
})
export class CollectionCategoriesComponent {

  @Input() style: string = 'vertical';
  @Input() image: string;
  @Input() theme: string;
  @Input() title: string;
  @Input() sliderOption: OwlOptions;
  

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

}
