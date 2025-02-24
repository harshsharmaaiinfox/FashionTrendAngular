import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompareState } from '../../../state/compare.state';
import { GetCompare } from '../../../action/compare.action';

@Component({
  selector: 'app-sticky-compare',
  templateUrl: './sticky-compare.component.html',
  styleUrls: ['./sticky-compare.component.scss']
})
export class StickyCompareComponent {

  @Select(CompareState.compareTotal) compareTotal$: Observable<number>;

  constructor(private store: Store) {
    this.store.dispatch(new GetCompare());
  }

}
