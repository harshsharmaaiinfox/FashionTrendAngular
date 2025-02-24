import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { Params } from '../../../../../shared/interface/core.interface';
import { ProductState } from '../../../../../shared/state/product.state';

@Component({
  selector: 'app-collection-paginate',
  templateUrl: './collection-paginate.component.html',
  styleUrls: ['./collection-paginate.component.scss']
})
export class CollectionPaginateComponent {

  @Select(ProductState.product) product$: Observable<ProductModel>;

  @Input() filter: Params;

  public totalItems: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.product$.subscribe(product => this.totalItems = product?.total);
  }

  setPaginate(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
    });
  }

}
