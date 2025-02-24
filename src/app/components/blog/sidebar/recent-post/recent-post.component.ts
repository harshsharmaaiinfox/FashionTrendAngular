import { Component, Input } from '@angular/core';
import { Blog } from '../../../../shared/interface/blog.interface';

@Component({
  selector: 'app-recent-post',
  templateUrl: './recent-post.component.html',
  styleUrls: ['./recent-post.component.scss']
})
export class RecentPostComponent {

  @Input() blogs: Blog[];

  constructor(){}

}
