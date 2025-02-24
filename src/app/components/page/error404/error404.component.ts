import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "404",
    items: [{ label: "404", active: true }]
  }

  constructor(private location: Location) {}

  back(){
    this.location.back();
  }

}
