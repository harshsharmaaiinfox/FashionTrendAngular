import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../../../shared/interface/core.interface';
import { Category, CategoryModel } from '../../../../../../shared/interface/category.interface';
import { CategoryState } from '../../../../../../shared/state/category.state';

@Component({
  selector: 'app-collection-category-filter',
  templateUrl: './collection-category-filter.component.html',
  styleUrls: ['./collection-category-filter.component.scss']
})
export class CollectionCategoryFilterComponent {

  @Select(CategoryState.category) category$: Observable<CategoryModel>;

  @Input() filter: Params;

  public categories: Category[];
  public selectedCategories: string[] = [];
  public searchText: string = '';
  
  constructor(private route: ActivatedRoute,
    private router: Router){
    this.category$.subscribe(res => this.categories = res.data.filter(category => category.type == 'product'));
  }

  ngOnChanges() {
    this.selectedCategories = this.filter['category'] ? this.filter['category'].split(',') : [];
  }

  applyFilter(event: Event) {
    const index = this.selectedCategories.indexOf((<HTMLInputElement>event?.target)?.value);  // checked and unchecked value

    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedCategories.push((<HTMLInputElement>event?.target)?.value); // push in array cheked value
    else
      this.selectedCategories.splice(index,1);  // removed in array unchecked value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategories.length ? this.selectedCategories?.join(",") : null,
        page: 1
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string){
    if(this.selectedCategories?.indexOf(item) != -1){
      return true;
    }
    return false;
  }

}
