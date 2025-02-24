import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderState } from '../../shared/state/loader.state';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { GetNotification } from '../../shared/action/notification.action';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  @Select(LoaderState.status) loadingStatus$: Observable<boolean>;

  public open: boolean = false;
  public breadcrumb: Breadcrumb = {
    title: "Dashboard",
    items: [{ label: 'Dashboard', active: false }]
  };

  constructor(private store: Store, private router: Router) {
    this.store.dispatch(new GetNotification());
   
      this.breadcrumb.title = this.router?.url?.split('?')[0]?.split('/')?.pop()!;
      if(this.router?.url.includes('order/details')) {
        this.breadcrumb.title = 'Order';
      }
      this.breadcrumb.items = [];
      this.breadcrumb.items.push({ label: this.breadcrumb.title, active: false });
  }

  openMenu(value: boolean) {
    this.open = value;
  }

}
