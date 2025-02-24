import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BlogService } from '../../../../shared/services/blog.service';
import { BlogState } from '../../../../shared/state/blog.state';
import { Blog, BlogModel } from '../../../../shared/interface/blog.interface';
import * as data from '../../../../shared/data/owl-carousel';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  @Select(BlogState.blog) blog$: Observable<BlogModel>;

  @Input() blogIds: number[] = [];
  @Input() sliderOption: OwlOptions;
  @Input() description: boolean;
  
  public blogs: Blog[] = [];
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);
  public blogOption = data.customOptionsItem3;

  constructor(public blogService: BlogService) {}

  ngOnChanges() {
    if (Array.isArray(this.blogIds)) {
      this.blog$.subscribe(blogs => {
        this.blogs = blogs.data.filter(blog => this.blogIds?.includes(blog?.id!));
      });
    }
  }

 }
