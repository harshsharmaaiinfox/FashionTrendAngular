import { Component} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BlogService } from '../../../shared/services/blog.service';
import { BlogState } from '../../../shared/state/blog.state';
import { TagState } from '../../../shared/state/tag.state';
import { CategoryState } from '../../../shared/state/category.state';
import { TagModel } from '../../../shared/interface/tag.interface';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { GetTags } from '../../../shared/action/tag.action';
import { Blog } from '../../../shared/interface/blog.interface';
import { GetRecentBlog } from '../../../shared/action/blog.action';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class BlogSidebarComponent {

  @Select(BlogState.resentBlog) resentBlog$: Observable<Blog[]>;
  @Select(TagState.tag) tag$: Observable<TagModel>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;

  constructor(public blogService: BlogService, private store: Store){
    this.store.dispatch(new GetTags({status: 1, type: 'post'}))
    this.store.dispatch(new GetRecentBlog({status: 1, type: 'post', paginate: '5'}))
  }

}
