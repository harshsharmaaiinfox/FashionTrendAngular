import { Component, Input } from '@angular/core';
import { Tag } from '../../../../shared/interface/tag.interface';

@Component({
  selector: 'app-blog-tag',
  templateUrl: './blog-tag.component.html',
  styleUrls: ['./blog-tag.component.scss']
})
export class BlogTagComponent {

  @Input() tags: Tag[];
  
  constructor(){}

}
