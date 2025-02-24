import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { BlogComponent } from './blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogSidebarComponent } from './sidebar/sidebar.component';
import { RecentPostComponent } from './sidebar/recent-post/recent-post.component';
import { BlogCategoryComponent } from './sidebar/blog-category/blog-category.component';
import { BlogTagComponent } from './sidebar/blog-tag/blog-tag.component';
import { SkeletonBlogComponent } from './skeleton-blog/skeleton-blog.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BlogComponent,
    BlogDetailsComponent,
    BlogSidebarComponent,
    RecentPostComponent,
    BlogCategoryComponent,
    BlogTagComponent,
    SkeletonBlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    SkeletonBlogComponent
  ]
})
export class BlogModule { }
