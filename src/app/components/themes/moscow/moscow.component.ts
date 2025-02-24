import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { GetProductByIds } from '../../../shared/action/product.action';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import {  Moscow } from '../../../shared/interface/theme.interface';
import * as data from  '../../../shared/data/owl-carousel';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moscow',
  templateUrl: './moscow.component.html',
  styleUrl: './moscow.component.scss'
})
export class MoscowComponent {

  @Input() data?: Moscow;
  @Input() slug?: string;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public categorySlider = data.categorySlider9;
  public productSlider6Item = data.productSlider6Item;

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

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.data['data'].theme_option.productBox === 'digital'){
        if (this.productSlider6Item && this.productSlider6Item.responsive && this.productSlider6Item.responsive['1065']) {
          this.productSlider6Item = {...this.productSlider6Item, items: 4, responsive :{
            ...this.productSlider6Item.responsive,
            1065: {
              items: 4
            }
          }}
        }
      } else {
        if (this.productSlider6Item && this.productSlider6Item.responsive && this.productSlider6Item.responsive['1065']) {
          this.productSlider6Item = {...this.productSlider6Item, items: 6, responsive :{
            ...this.productSlider6Item.responsive,
            1065: {
              items: 6
            }
          }}
        }
      }
    })

  }

}
