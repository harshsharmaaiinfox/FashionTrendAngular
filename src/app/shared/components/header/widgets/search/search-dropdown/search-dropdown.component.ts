import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductState } from '../../../../../state/product.state';
import { Product } from '../../../../../interface/product.interface';
import { Category } from '../../../../../interface/category.interface';
import { CategoryService } from '../../../../../services/category.service';
import { ProductService } from '../../../../../services/product.service';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrl: './search-dropdown.component.scss'
})
export class SearchDropdownComponent {

  @Input() term : any;
  @Input() isOpenResult : boolean;
  @Input() selectedResultIndex: any;
  @Input() categories: Category[];
  @Input() products: Product[];
  @Input() selectedCategory: String;

  @ViewChild('resultsContainer') resultsContainer: ElementRef;
  
  @Select(ProductState.productBySearch) productBySearch$: Observable<any>;
   
  public skeleton = Array.from({ length: 3 }, (_, index) => index);

  constructor(public categoryService: CategoryService, public productService: ProductService, public router: Router){}

}
