import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { PageState } from '../../../shared/state/page.state';
import { GetFaqs } from '../../../shared/action/page.action';
import { FaqModel } from '../../../shared/interface/page.interface';
import { PageService } from '../../../shared/services/page.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  public breadcrumb: Breadcrumb = {
    title: "FAQ's",
    items: [{ label: "FAQ's", active: true }]
  }

  @Select(PageState.faq) faq$: Observable<FaqModel>;

  constructor(private store: Store, public pageService: PageService) {
    this.pageService.skeletonLoader = true;
    this.store.dispatch(new GetFaqs()).subscribe({
      complete: () => {
        this.pageService.skeletonLoader = false;
      }
    });
  }

}
