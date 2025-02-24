import { Component, Input } from '@angular/core';
import { Category } from '../../../../shared/interface/category.interface';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent {

  @Input() data: Category[];

}
