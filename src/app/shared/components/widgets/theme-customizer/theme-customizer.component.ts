import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Option } from '../../../interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-theme-customizer',
  templateUrl: './theme-customizer.component.html',
  styleUrls: ['./theme-customizer.component.scss']
})
export class ThemeCustomizerComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public open: boolean = false;
  public show: boolean = false;
  public mode: string;
  public value: string;
  public theme_color: string;
  public secondary_color: string;
  public theme: string

  constructor(public themeOptionService: ThemeOptionService) {
  }

  ngOnInit() {

    this.themeOption$.subscribe(option => {
      this.mode = option?.general ? option?.general?.mode : 'light';
      this.value = option?.general ? option?.general?.language_direction : 'ltr';
    })
  }

  toggle(){
    this.open = !this.open;
  }

  layout(value: string){
    this.value = value;
    if(value === 'rtl'){
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }

  layoutMode(value: string){
    this.mode = value;
    if(this.mode === 'dark') {
      document.getElementsByTagName('html')[0].classList.add('dark')
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark')
    }
  }

  customizeThemeColor(event: any, val:string){
    document.documentElement.style.setProperty(val, event.target.value);
  }

  closeDropdown(){
    this.open = false;
  }
}
  