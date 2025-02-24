import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompareState } from '../../../../state/compare.state';

@Component({
  selector: 'app-header-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent {

  @Select(CompareState.compareTotal) compareTotal$: Observable<number>;
  
}
