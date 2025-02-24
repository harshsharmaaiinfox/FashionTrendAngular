import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Blog } from '../../../shared/interface/blog.interface';
import { BlogState } from '../../../shared/state/blog.state';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {

  @Select(BlogState.selectedBlog) blog$: Observable<Blog>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Product",
    items: []
  }

  public sidebar: string;

  constructor(private seoService: SeoService,
    private route: ActivatedRoute){
    this.blog$.subscribe(blog => {
      this.breadcrumb.items = [];
      this.breadcrumb.title = blog.title;
      this.breadcrumb.items.push({ label: 'Blog', active: true }, { label: blog.title, active: false });
      // this.seoService.seo();
    });

    // For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      if(params['sidebar']) {
        this.sidebar = params['sidebar'];
      } else {
        // Get Blog Layout
        this.themeOption$.subscribe(theme => {
          this.sidebar = theme?.blog.blog_sidebar_type;
        });
      }
    });
  }

}
