import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { GetBlogs } from '../../../shared/action/blog.action';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetProductByIds } from '../../../shared/action/product.action';
import { GetStores } from '../../../shared/action/store.action';
import * as data from '../../../shared/data/owl-carousel';
import { Option } from '../../../shared/interface/theme-option.interface';
import { Paris } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';

@Component({
  selector: 'app-paris',
  templateUrl: './paris.component.html',
  styleUrls: ['./paris.component.scss']
})
export class ParisComponent {

  @Input() data?: Paris;
  @Input() slug?: string;
 
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public categorySlider = data.categorySlider;
  public productSlider = data.productSlider

  constructor(private store: Store,
  private themeOptionService: ThemeOptionService,
  private route: ActivatedRoute) {
  }

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
      const getBlogs$ = this.store.dispatch(new GetBlogs({
        status: 1,
        ids: this.data?.content.main_content?.section9_featured_blogs?.blog_ids?.join(',')
      }));

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBlogs$, getBrand$, getStore$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.data['data'].theme_option.productBox === 'digital'){
        if (this.productSlider && this.productSlider.responsive && this.productSlider.responsive['1000']) {
          this.productSlider = {...this.productSlider, items: 3, responsive :{
            ...this.productSlider.responsive,
            1000: {
              items: 3
            }
          }}
        }
      } else {
        if (this.productSlider && this.productSlider.responsive && this.productSlider.responsive['1000']) {
          this.productSlider = {...this.productSlider, items: 5, responsive :{
            ...this.productSlider.responsive,
            1000: {
              items: 5
            }
          }}
        }
      }
    })

  }

}
