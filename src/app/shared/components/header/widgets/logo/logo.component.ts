import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { Select } from '@ngxs/store';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  @Input() textClass: string = 'f-w-600';
  @Input() data: Option | null;
  @Input() logo: string | null | undefined;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

}
