import { Component, Input } from '@angular/core';
import { Select, Store  } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { GetProductByIds } from '../../../shared/action/product.action';
import { Berlin } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetStores } from '../../../shared/action/store.action';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-berlin',
  templateUrl: './berlin.component.html',
  styleUrls: ['./berlin.component.scss']
})
export class BerlinComponent {

  @Input() data?: Berlin;
  @Input() slug?: string;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public categorySlider = data.categorySlider;
  public productSliderMargin = data.productSliderMargin;

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

      this.route.queryParams.subscribe(params => {
        if(this.route.snapshot.data['data'].theme_option.productBox === 'digital'){
          if (this.productSliderMargin && this.productSliderMargin.responsive && this.productSliderMargin.responsive['1030']) {
            this.productSliderMargin = {...this.productSliderMargin, items: 3, responsive :{
            ...this.productSliderMargin.responsive,
              1030: {
                items: 3
              }
            }}
          }
        } else {
          if (this.productSliderMargin && this.productSliderMargin.responsive && this.productSliderMargin.responsive['1030']) {
            this.productSliderMargin = {...this.productSliderMargin, items: 5, responsive :{
            ...this.productSliderMargin.responsive,
              1030: {
                items: 5
              }
            }}
          }
        }
      })
    }

  }

 }
