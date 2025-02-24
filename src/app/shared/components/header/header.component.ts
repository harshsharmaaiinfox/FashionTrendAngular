import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../state/theme-option.state';
import { Option } from '../../interface/theme-option.interface';
import { ThemeState } from '../../state/theme.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(ThemeState.activeTheme) activeTheme$: Observable<String>;
  
  @Input() logo?: string | undefined;

  public style: string = 'basic_header';
  public sticky: boolean = true;
  public path: string;

  constructor(router: Router, public route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => this.path = params['theme'])
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.setHeader();
      }
    });
  }
 
  setHeader() {
    if(this.path){
      if(this.path == 'rome') {
        this.style = 'standard_header';
      } else if(this.path == 'madrid') {
        this.style = 'classic_header';
      } else if(this.path == 'berlin' ||
      this.path == 'denver' || 
      this.path == 'moscow' ||
      this.path == 'cairo') {
        this.style = 'minimal_header';
      } else {
        this.style = 'basic_header';
      }
    } else {
      this.themeOption$.subscribe(theme => {
        this.style = theme?.header ? theme?.header.header_options : 'basic_header';
        this.sticky = theme?.header && theme?.header?.sticky_header_enable ? true : this.sticky;
      });
    }
  }

}
