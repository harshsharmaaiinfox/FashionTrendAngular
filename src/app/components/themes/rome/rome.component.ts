import { Component, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { Rome } from '../../../shared/interface/theme.interface';
import { GetCategoryProducts, GetProductByIds } from '../../../shared/action/product.action';
import { ProductState } from '../../../shared/state/product.state';
import { GetBlogs } from '../../../shared/action/blog.action';
import { Product } from '../../../shared/interface/product.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetStores } from '../../../shared/action/store.action';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rome',
  templateUrl: './rome.component.html',
  styleUrls: ['./rome.component.scss']
})
export class RomeComponent {

  @Input() data?: Rome;
  @Input() slug?: string;

  @Select(ProductState.categoryProducts) categoryProduct$: Observable<Product[]>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public categorySlider = data.categorySlider9;
  public productSlider6ItemMargin = data.productSlider6ItemMargin;
  public customOptionsItem4 = data.customOptionsItem4;
  public productFilterIds: number[] = []; 
  public selectedCategoryId: number;
  public showProductBox: number = 6;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) {}

  ngOnInit() {
    if(this.data?.slug == this.slug) {
      // Get Products
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

      const getCatProducts$ = this.store.dispatch(new GetCategoryProducts({
         category_ids: this.data?.content?.categories_products?.category_ids?.join(',') 
      }));

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBlogs$, getCatProducts$, getBrand$, getStore$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });

      if(this.data?.content?.categories_products && this.data?.content?.categories_products?.category_ids?.length) {
        this.selectCategory(this.data?.content?.categories_products?.category_ids[0])
      }
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
          this.showProductBox = 4;
        }
      } else {
        if (this.productSlider6ItemMargin && this.productSlider6ItemMargin.responsive && this.productSlider6ItemMargin.responsive['1180']) {
          this.productSlider6ItemMargin = {...this.productSlider6ItemMargin, items: 6, responsive :{
            ...this.productSlider6ItemMargin.responsive,
            1180: {
              items: 6
            }
          }}
          this.showProductBox = 6;
        }
      }
    })

  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    this.categoryProduct$.subscribe(products => {
      this.productFilterIds = products.filter(product => product?.categories?.map(category => category.id).includes(id))
          ?.map(product => product.id).slice(0, 5);
    });
  }

}
