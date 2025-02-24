import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PageState } from '../../shared/state/page.state';
import { Page } from '../../shared/interface/page.interface';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { PageService } from '../../shared/services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  @Select(PageState.selectedPage) selectedPage$: Observable<Page>;

  public breadcrumb: Breadcrumb = {
    title: "Page",
    items: []
  }

  constructor(private meta: Meta, public pageService: PageService){
    this.selectedPage$.subscribe(page =>{
      this.breadcrumb.items = [];
      this.breadcrumb.title = page.title;
      this.breadcrumb.items.push({ label: 'Page', active: true }, { label: page.title, active: false });
      page?.meta_title && this.meta.updateTag({property: 'og:title', content: page?.meta_title});
      page?.meta_description && this.meta.updateTag({property: 'og:description', content: page?.meta_description});
    });
  }

}
