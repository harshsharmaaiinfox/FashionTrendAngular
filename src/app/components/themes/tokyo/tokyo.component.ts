import { Component, Input, NgZone } from '@angular/core';
import { Select, Store  } from '@ngxs/store';
import { Observable, forkJoin, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GetProductByIds   } from '../../../shared/action/product.action';
import { Tokyo } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetStores } from '../../../shared/action/store.action';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ThemeState } from '../../../shared/state/theme.state';
import * as data from  '../../../shared/data/owl-carousel';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tokyo',
  templateUrl: './tokyo.component.html',
  styleUrls: ['./tokyo.component.scss']
})
export class TokyoComponent {

  @Input() data?: Tokyo;
  @Input() slug?: string;

  public productSlider = data.productSlider2;
  public categorySlider = data.categorySlider9;
  public storageURL = environment.storageURL;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(ThemeState.activeTheme) activeTheme$: Observable<string>;

  constructor(private store: Store,
    private themeOptionService: ThemeOptionService,
    private route: ActivatedRoute) {}

    ngOnInit() {
    if(this.data?.slug == this.slug) {
      const getProducts$ = this.store.dispatch(new GetProductByIds({
        status: 1,
        paginate: this.data?.content?.products_ids.length,
        ids: this.data?.content?.products_ids?.join(',')
      }));
      const getBrand$ = this.store.dispatch(new GetBrands({ 
        status: 1,
        ids: this.data?.content?.brands?.brand_ids?.join()
      }));
      const getStore$ = this.store.dispatch(new GetStores({ 
        status: 1,
        ids: this.data?.content?.main_content?.seller?.store_ids?.join()
      }));
      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBrand$, getStore$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
 
    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.data['data'].theme_option.productBox === 'digital'){
        if (this.productSlider && this.productSlider.responsive && this.productSlider.responsive['990']) {
          this.productSlider = {...this.productSlider, items: 3, responsive :{
            ...this.productSlider.responsive,
            990: {
              items: 3
            }
          }}
        }
      } else {
        if (this.productSlider && this.productSlider.responsive && this.productSlider.responsive['990']) {
          this.productSlider = {...this.productSlider, items: 5, responsive :{
            ...this.productSlider.responsive,
            990: {
              items: 5
            }
          }}
        }
      }
    })
 
  }

  ngAfterViewChecked() {
    // Add Topbar Dark Class
    document.querySelector('.header-top')?.classList.add('bg-dark');
  }

  ngOnDestroy() {

    // Remove Topbar Dark Class for this theme only
    document.querySelector('.header-top')?.classList.remove('bg-dark');
  }

}
