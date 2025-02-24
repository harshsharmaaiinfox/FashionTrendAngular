import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BrandState } from '../../../../../../shared/state/brand.state';
import { Brand, BrandModel } from '../../../../../../shared/interface/brand.interface';

@Component({
  selector: 'app-collection-brand-filter',
  templateUrl: './collection-brand-filter.component.html',
  styleUrl: './collection-brand-filter.component.scss'
})
export class CollectionBrandFilterComponent {

  @Select(BrandState.brand) brand$: Observable<BrandModel>;

  @Input() filter: Params;

  public brands: Brand[];
  public selectedBrands: string[] = [];
  public searchText: string = ''

  constructor(private route: ActivatedRoute,
    private router: Router){
    this.brand$.subscribe(res => this.brands = res.data);

  }

  ngOnChanges() {
    this.selectedBrands = this.filter['brand'] ? this.filter['brand'].split(',') : [];
  }

  applyFilter(event: Event) {
    const index = this.selectedBrands.indexOf((<HTMLInputElement>event?.target)?.value);  // checked and unchecked value

    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedBrands.push((<HTMLInputElement>event?.target)?.value); // push in array cheked value
    else
      this.selectedBrands.splice(index,1);  // removed in array unchecked value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: this.selectedBrands.length ? this.selectedBrands?.join(",") : null,
        page: 1
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string){
    if(this.selectedBrands?.indexOf(item) != -1){
      return true;
    }
    return false;
  }
}
