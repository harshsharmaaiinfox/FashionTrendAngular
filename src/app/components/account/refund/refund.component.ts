import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RefundState } from '../../../shared/state/refund.state';
import { GetRefund } from '../../../shared/action/refund.action';
import { RefundModel } from '../../../shared/interface/refund.interface';
import { Params } from '../../../shared/interface/core.interface';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent {

  @Select(RefundState.refund) refund$: Observable<RefundModel>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  constructor(private store: Store) {
    this.store.dispatch(new GetRefund(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new GetRefund(this.filter));
  }

}
