import { ProductService } from './../../../shared/services/product.service';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProducts } from '../../../shared/action/product.action';
import { Product, ProductModel } from '../../../shared/interface/product.interface';
import { ProductState } from '../../../shared/state/product.state';
import { Params } from '../../../shared/interface/core.interface';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import * as data from '../../../shared/data/owl-carousel'
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public breadcrumb: Breadcrumb = {
    title: "Search",
    items: [{ label: "Search", active: true }]
  }

  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public products: Product[];
  public search = new FormControl();
  public totalItems: number = 0;
  public gridClass: string = "row g-sm-4 g-3 row-cols-2 row-cols-md-3 cols-lg-4 row-cols-xxl-6 product-list-section";
  public skeletonItems = Array.from({ length: 12 }, (_, index) => index);
  public productSlider6ItemMargin = data.productSlider6ItemMargin;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 12, // Display per page,
    'status': 1,
    'search': ''
  }

  constructor(private store: Store, public productService: ProductService, private route: ActivatedRoute, public router: Router){
  //  this.getProduct(this.filter);

   this.route.queryParams.subscribe(params => {
    if(params['search']) {
      this.filter['search'] = params['search'];
      this.search.patchValue(params['search'] ? params['search'] : '')
    }
    this.store.dispatch(new GetProducts(this.filter)).subscribe({
      next: (val) =>{
        this.products = val.product.product.data
      }
    });
   });
  }

  ngOnInit(){
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
      if(inputValue.length == 0){
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: inputValue
          }
        });
        this.filter['search'] = inputValue;
      }
    });

    this.themeOption$.subscribe(option => {
      if(option?.product?.product_box_variant === 'digital') {
        this.gridClass = 'row g-sm-4 g-3 row-custom-col-1 row-cols-1 row-cols-sm-2 cols-lg-4 row-cols-xxl-4 product-list-section'
      }
    })
  }

  searchProduct(){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search.value
      }
    });
    this.filter['search'] = this.search.value;
  }

}
