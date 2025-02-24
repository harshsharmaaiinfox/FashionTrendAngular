import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { map, Observable, tap } from 'rxjs';
import { ProductService } from '../../../../../shared/services/product.service';
import { Product, ProductModel } from '../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../shared/state/product.state';
import { Params } from '../../../../../shared/interface/core.interface';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-collection-products',
  templateUrl: './collection-products.component.html',
  styleUrls: ['./collection-products.component.scss']
})
export class CollectionProductsComponent implements AfterViewInit {

  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(ProductState.product) productFiltered$: Observable<ProductModel>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  @Input() filter: Params;
  @Input() gridCol: string;

  public gridClass: string = "row g-sm-4 g-3 row-cols-xl-4 row-cols-md-3 row-cols-2 product-list-section";

  public skeletonItems = Array.from({ length: 40 }, (_, index) => index);

  constructor(
    public productService: ProductService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.productFiltered$ = this.product$.pipe(
      map((products: any) => {
        products.data = products.data.filter((product: Product) => product.store_id != 22);
        products.total = products.data.length;
      return products;
      })
     );
     this.cdRef.detectChanges();
  }

  setGridClass(gridClass: string) {
    this.gridClass = gridClass;
  }
}
