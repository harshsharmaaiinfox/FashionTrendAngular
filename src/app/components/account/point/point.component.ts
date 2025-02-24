import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../shared/state/setting.state';
import { PointState } from '../../../shared/state/point.state';
import { GetUserTransaction } from '../../../shared/action/point.action';
import { Point } from '../../../shared/interface/point.interface';
import { Params } from '../../../shared/interface/core.interface';
import { Values } from '../../../shared/interface/setting.interface';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(PointState.point) point$: Observable<Point>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  constructor(private store: Store) {
    this.store.dispatch(new GetUserTransaction(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new GetUserTransaction(this.filter));
  }

}
