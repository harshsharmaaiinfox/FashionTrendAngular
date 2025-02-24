import { Component, Input } from '@angular/core';
import { Select, Store  } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { GetProductByIds } from '../../../shared/action/product.action';
import { GetBlogs } from '../../../shared/action/blog.action';
import { Madrid } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetStores } from '../../../shared/action/store.action';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-madrid',
  templateUrl: './madrid.component.html',
  styleUrls: ['./madrid.component.scss']
})
export class MadridComponent {

  @Input() data?: Madrid;
  @Input() slug?: string;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public categorySlider = data.categorySlider9;
  public productSlider6Item = data.productSlider6Item;
  public productSlider6ItemMargin = data.productSlider6ItemMargin;
  public customOptionsItem4 = data.customOptionsItem4;
  public item = 2;
  public enableDeal: boolean = true; 

  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) {}

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
        ids: this.data?.content?.seller?.store_ids?.join()
      }));
      const getBlogs$ = this.store.dispatch(new GetBlogs({
        status: 1,
        ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
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
        if (this.productSlider6ItemMargin && this.productSlider6ItemMargin.responsive && this.productSlider6ItemMargin.responsive['1180']) {
          this.productSlider6ItemMargin = {...this.productSlider6ItemMargin, items: 4, responsive :{
            ...this.productSlider6ItemMargin.responsive,
            1180: {
              items: 4
            }
          }}
        }
        this.item = this.enableDeal ? 2 : 4;
      } else {
        if (this.productSlider6ItemMargin && this.productSlider6ItemMargin.responsive && this.productSlider6ItemMargin.responsive['1180']) {
          this.productSlider6ItemMargin = {...this.productSlider6ItemMargin, items: 6, responsive :{
            ...this.productSlider6ItemMargin.responsive,
            1180: {
              items: 6
            }
          }}
        }
        this.item = this.enableDeal ? 4 : 6;
      }
    })

  }

  getDeals(value: Boolean){
    this.enableDeal = Boolean(value);  
  }

}
