import { Component, HostListener } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, filter, forkJoin } from 'rxjs';
import { ThemeOptionState } from '../shared/state/theme-option.state';
import { Option } from '../shared/interface/theme-option.interface';
import { GetCategories } from '../shared/action/category.action';
import { GetPages } from '../shared/action/page.action';
import { ThemeOptionService } from '../shared/services/theme-option.service';
import { GetBlogs } from '../shared/action/blog.action';
import { GetDealProducts, GetProductBySearch } from '../shared/action/product.action';
import { GetMenu } from '../shared/action/menu.action';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GetWishlist } from '../shared/action/wishlist.action';
import { UpdateProductBox } from '../shared/action/theme-option.action';
import { GetUserDetails } from '../shared/action/account.action';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(ThemeOptionState.cookies) cookies$: Observable<boolean>;
  @Select(ThemeOptionState.exit) exit$: Observable<boolean>;

  public cookies: boolean;
  public exit: boolean;
  public theme: string;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    public themeOptionService: ThemeOptionService) {

    this.route.queryParams.subscribe(params => this.theme = params['theme'])

    this.store.dispatch(new GetUserDetails ());
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        if(this.theme) {
          if(this.theme == 'paris') {
            this.themeOptionService.theme_color = '#0da487';
    
          } else if (this.theme == 'osaka'){
            this.themeOptionService.theme_color = '#0da487';
    
          } else if(this.theme == 'tokyo') {
            this.themeOptionService.theme_color = '#d99f46';
    
          } else if(this.theme == 'rome') {
            this.themeOptionService.theme_color = '#0baf9a';
    
          } else if(this.theme == 'madrid') {
            this.themeOptionService.theme_color = '#239698';
    
          } else if(this.theme == 'berlin' || this.theme == 'denver' || this.theme == 'moscow') {
            this.themeOptionService.theme_color = '#417394';
            
          }else if(this.theme == 'cairo') {
            this.themeOptionService.theme_color = '#7b4397';
            this.themeOptionService.secondary_color = '#dc2430';
          }
        } else  {
          this.themeOption$.subscribe(theme => {
            this.themeOptionService.theme_color = theme?.general?.primary_color;
            this.themeOptionService.secondary_color = theme?.general?.secondary_color;

            document.documentElement.style.setProperty('--theme-color',this.themeOptionService?.theme_color);
            document.documentElement.style.setProperty('--theme-color2',this.themeOptionService?.secondary_color);
          })
        }

        document.documentElement.style.setProperty('--theme-color',this.themeOptionService?.theme_color);
        document.documentElement.style.setProperty('--theme-color2',this.themeOptionService?.secondary_color);
      }
    });

    this.cookies$.subscribe(res => this.cookies = res);
    this.exit$.subscribe(res => this.exit = res);
    this.router.events.subscribe(
      (event) => {
        if ( event instanceof NavigationEnd ) {
          this.router.url
      }
      }
    );
    this.themeOptionService.preloader = true;
    const getCategories$ = this.store.dispatch(new GetCategories({ status: 1 }));
    const getBlog$ = this.store.dispatch(new GetBlogs({ status: 1, paginate: 10 }));
    const getProductBySearch$ = this.store.dispatch(new GetProductBySearch());
    const getPages$ = this.store.dispatch(new GetPages({ status: 1 }));
    const getMenu$ = this.store.dispatch(new GetMenu({ status: 1 }));
    this.store.dispatch(new GetWishlist())
    forkJoin([getCategories$, getProductBySearch$ , getPages$, getBlog$, getMenu$]).subscribe({
      complete: () => {
        this.themeOptionService.preloader = false;
      }
    });

  }

  setLogo() {
    var headerLogo;
    var footerLogo;
    var footerClass;
    if(this.theme) {
      
      if(this.theme == 'paris') {
        headerLogo = 'assets/images/logo/1.png';
        footerLogo = 'assets/images/logo/1.png';

      } else if (this.theme == 'osaka'){
        headerLogo = 'assets/images/logo/1.png';
        footerLogo = 'assets/images/logo/1.png';

      } else if(this.theme == 'tokyo') {
        headerLogo = 'assets/images/logo/2.png';
        footerLogo = 'assets/images/logo/2.png';

      } else if(this.theme == 'rome') {
        headerLogo = 'assets/images/logo/3.png';
        footerLogo = 'assets/images/logo/3.png';

      } else if(this.theme == 'madrid') {
        headerLogo = 'assets/images/logo/4.png';
        footerLogo = 'assets/images/logo/4.png'
        footerClass = 'footer-section-2 footer-color-2'

      } else if(this.theme == 'berlin') {
        headerLogo = 'assets/images/logo/6.png';
        footerLogo = 'assets/images/logo/4.png'
        footerClass = 'footer-section-2 footer-color-3'

      } else if( this.theme == 'denver') {
        headerLogo = 'assets/images/logo/6.png';
        footerLogo = 'assets/images/logo/4.png'
        footerClass = 'footer-section-2 footer-color-3'

      } else if(this.theme == 'moscow') {
        headerLogo = 'assets/images/logo/6.png';
        footerLogo = 'assets/images/logo/4.png'
        footerClass = 'footer-section-2 footer-color-3'

      }else if(this.theme == 'cairo') {
        headerLogo = 'assets/images/logo/7.png';
        footerLogo = 'assets/images/logo/4.png'
        footerClass = 'footer-section-2 footer-color-3'
      }
    } else {
      this.themeOption$.subscribe(theme => {
        headerLogo = theme?.logo?.header_logo?.original_url;
        footerLogo = theme?.logo?.footer_logo?.original_url;
        footerClass = theme?.footer.footer_style === 'dark_mode' ? 'footer-section-2 footer-color-3' : '';
      });
    }

    return { header_logo: headerLogo, footer: { footer_logo: footerLogo, footer_class: footerClass }  }
  }

  ngOnInit(){
    this.setVariant();
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.setVariant();
      }
    });
  }

  setVariant(){
    if(this.theme === 'paris' || this.theme === 'tokyo'){
      this.themeOptionService.productBox = 'basic';
    } else if ( this.theme === 'berlin' || this.theme === 'denver'){
      this.themeOptionService.productBox = 'standard';
    } else if (this.theme === 'osaka' || this.theme === 'rome'){
      this.themeOptionService.productBox = 'classic';
    } else if (this.theme === 'cairo'){
      this.themeOptionService.productBox = 'digital';
    } else if (this.theme === 'madrid' || this.theme === 'moscow'){
      this.themeOptionService.productBox = 'premium';
    }  else {
      this.themeOption$.subscribe(theme => {
        this.themeOptionService.productBox = theme?.product ? theme?.product?.product_box_variant : '';
      });
    }
    this.store.dispatch(new UpdateProductBox(this.themeOptionService.productBox))
  }
}
