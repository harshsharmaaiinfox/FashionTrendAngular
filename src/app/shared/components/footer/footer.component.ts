import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../interface/theme-option.interface';
import { ThemeOptionState } from '../../state/theme-option.state';
import { Footer } from '../../interface/theme.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() footer: Footer;

  public style: string;
  public path: string;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  constructor(router: Router, public route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => this.path = params['theme'])
    this.setFooter();
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.setFooter();
      }
    });
  }


  setFooter() {
    if(this.path!){
      if(this.path == 'cairo') {
        this.style = 'footer_subscribe';
      } else if(this.path == 'paris' || 
      this.path == 'tokyo' ||
                this.path == 'rome' ||
                this.path == 'osaka'){
                  this.style = 'basic_footer'
      }else if(this.path == 'madrid' ||
              this.path == 'berlin' ||  
              this.path == 'denver' ||
              this.path == 'moscow'){
                this.style = 'classic_footer'
              }
      } else {
        this.themeOption$.subscribe(theme => {
          this.style = theme?.footer ? theme?.footer.footer_style : 'basic_footer';
        });
    }
  }
}
