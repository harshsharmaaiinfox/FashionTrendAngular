import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-theme-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  @Input() categoryIds: number[] = [];
  @Input() style: string = 'vertical';
  @Input() title?: string;
  @Input() image?: string;
  @Input() theme: string;
  @Input() sliderOption: OwlOptions;
  @Input() selectedCategoryId: number;

  @Output() selectedCategory: EventEmitter<number> = new EventEmitter();

  constructor(){}

  selectCategory(id: number) {
    this.selectedCategory.emit(id);
  }

}
