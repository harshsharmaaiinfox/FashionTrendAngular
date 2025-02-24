import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductState } from '../../../../state/product.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetProductBySearch } from './../../../../action/product.action';
import { Product } from '../../../../interface/product.interface';
import { CategoryState } from '../../../../state/category.state';
import { Category, CategoryModel } from '../../../../interface/category.interface';
import { GetSearchByCategory } from '../../../../action/category.action';

@Component({
  selector: 'app-box-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  @Input() style: string = 'basic';
  @Input() data: any;

  @ViewChild('resultsContainer') resultsContainer: ElementRef;
  @Select(ProductState.productBySearch) productBySearch$: Observable<any>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(CategoryState.searchByCategory) searchCategory$: Observable<Category[]>;

  public term = new FormControl();
  public selectedCategory = new FormControl('');
  public show: boolean = false;
  public isOpenResult = false
  public product: Product[];
  public filteredResults: Product[] = [];
  public filteredCategory: Category[] = [];
  public selectedResultIndex = -1;
  public categories: Category[];

  constructor(private route: ActivatedRoute,
    private router: Router, private store: Store) {
    this.category$.subscribe(res => this.categories = res.data.filter(category => category.type == 'product'));
      this.store.dispatch(new GetSearchByCategory({ status: 1, paginate: 4 }));
      this.searchCategory$.subscribe(categories => {
        this.filteredCategory = categories
      });

      this.productBySearch$.subscribe(item => this.product = item);
      this.selectedCategory.valueChanges.subscribe(data => {
        this.isOpenResult = false;
        let category = data ?  { status: 1, category_id: data } : {status: 1};
        this.store.dispatch(new GetProductBySearch(category))
        this.store.dispatch(new GetSearchByCategory(data ?  { status: 1, ids: data } : { status: 1, paginate: 4 }))
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    let data = changes['data']?.currentValue;
    let ids  =  data?.content?.home_banner?.main_banner?.category_ids;
    if( ids && ids.length) {
      this.category$.subscribe(res => {
        this.categories = res.data.filter(category => ids?.includes(category.id))
      });
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.navigateResults(-1);
    } else if (event.key === 'ArrowDown') {
      this.navigateResults(1);
    }
  }

  onInputChange() {
    this.filteredResults = this.term.value <= 0 ? this.product.slice(0, 4) : this.filterWords(this.term.value).slice(0, 4);
    this.filteredCategory = this.term.value <= 0 ? this.filteredCategory.slice(0, 4) : this.searchCategory(this.term.value);
    this.selectedResultIndex = -1;
  }

  focusInput(val:boolean){
    this.filteredResults = this.product.slice(0, 4)
    this.isOpenResult = val;
  }

  filterWords(input: string): Product[] {
    return this.product.filter(product => {
      const productName = product.name.toLowerCase();
      const inputLower = input.toLowerCase();
      const words = productName.split(' ');
      const isMatch = words.some(word => word.startsWith(inputLower));
      return isMatch
    });
  }

  selectResult(result: string) {
    this.term.patchValue(result);
    this.filteredResults = [];
    this.selectedResultIndex = -1;
  }

  searchCategory(term: string){
    let params = { status: 1, paginate: 4, search: term }
    this.store.dispatch(new GetSearchByCategory(params));
    this.searchCategory$.subscribe(categories => this.filteredCategory = categories);
    return []
  }

  navigateResults(direction: number) {
    const newIndex = this.selectedResultIndex + direction;
    if (newIndex >= 0 && newIndex < this.filteredResults.length) {
      this.selectedResultIndex = newIndex;
      this.scrollResultsContainer();
    }
  }

  private scrollResultsContainer() {
    if (this.resultsContainer && this.resultsContainer.nativeElement) {
      const container = this.resultsContainer.nativeElement;
      const selectedResultElement = this.resultsContainer.nativeElement.querySelector('.result-item.selected');
      
      if (selectedResultElement) {
        const containerRect = container.getBoundingClientRect();
        const selectedRect = selectedResultElement.getBoundingClientRect();

        if (selectedRect.bottom > containerRect.bottom) {
          // Scroll down
          container.scrollTop += 150;
        } else if (selectedRect.top < containerRect.top) {
          // Scroll up
          container.scrollTop -= 150;
        }
      }
    }
  }

  onEnterKey() {
    // Perform the action you want when the Enter key is pressed in the input
    if (this.selectedResultIndex !== -1) {
      const selectedItem = this.filteredResults[this.selectedResultIndex];
      this.router.navigateByUrl(`/product/${selectedItem.slug}`)
      this.isOpenResult = false;
      this.selectedResultIndex = 0
      this.term.patchValue('')
    } 
  }

  redirectToSearch() {
    this.router.navigate(['/search'], {
      relativeTo: this.route,
      queryParams: {
        category: null,
        search: this.term.value ? this.term.value : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  toggleSearchBox(){
    this.show = !this.show
  }

}
