import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { Footer } from '../../../../../shared/interface/theme.interface';
import { SettingState } from '../../../../state/setting.state';
import { Values } from '../../../../interface/setting.interface';

@Component({
  selector: 'app-footer-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class FooterLogoComponent {

  @Input() data: Option | null;
  
  @Input() footer: Footer;

  @Select(SettingState.setting) setting$: Observable<Values>;

}
