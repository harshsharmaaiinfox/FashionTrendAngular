import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { GetBlogs } from '../../../shared/action/blog.action';
import { BlogState } from '../../../shared/state/blog.state';
import { Blog, BlogModel } from '../../../shared/interface/blog.interface';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { AboutUs, Option } from '../../../shared/interface/theme-option.interface';
import * as data from  '../../../shared/data/owl-carousel';
import { environment } from '../../../../environments/environment';

export interface Clients {
  title: string;
  count: string;
  imageIcon: string
  description: string
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  @Select(BlogState.blog) blog$: Observable<BlogModel>;
  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  public aboutUs?: AboutUs;
  public blogs: Blog[] = [];

  public breadcrumb: Breadcrumb = {
    title: "About Us",
    items: [{ label: 'About Us', active: true }]
  }

  public productSlider = data.productSliderMargin;
  public storageURL = environment.storageURL;
 
  public clientsOptions: OwlOptions = {
    loop:true,
    margin:20,
    items: 3,
    autoplay:true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  public teamOptions: OwlOptions = {
    loop:true,
    margin:20,
    items: 4,
    autoplay:true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  public testimonialsOptions: OwlOptions = {
    loop:true,
    margin:20,
    items: 4,
    // autoplay:true,
    center:true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  public blogOptions: OwlOptions = {
    loop:true,
    margin:20,
    items: 4,
    autoplay:true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
  }

  constructor( private store: Store){
    this.themeOptions$.subscribe(option =>{
      this.aboutUs = option?.about_us;
    })
    if (Array.isArray(this.aboutUs?.blog?.blog_ids) && this.aboutUs?.blog?.blog_ids?.length) {
      this.store.dispatch(new GetBlogs({status: 1, ids: this.aboutUs?.blog.blog_ids?.join()}));
      this.blog$.subscribe(blogs => {
        this.blogs = blogs?.data.filter(blog => this.aboutUs?.blog.blog_ids?.includes(blog?.id!));
      });
    }
  }
}
