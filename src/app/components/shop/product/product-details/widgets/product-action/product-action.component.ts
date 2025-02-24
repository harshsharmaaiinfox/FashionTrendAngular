import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Product } from '../../../../../../shared/interface/product.interface';
import { SizeChartModalComponent } from '../../../../../../shared/components/widgets/modal/size-chart-modal/size-chart-modal.component';
import { DeliveryReturnModalComponent } from '../../../../../../shared/components/widgets/modal/delivery-return-modal/delivery-return-modal.component';
import { QuestionModalComponent } from '../../../../../../shared/components/widgets/modal/question-modal/question-modal.component';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../../../shared/state/theme-option.state';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent {

  @Input() product: Product;

  @ViewChild("sizeChartModal") SizeChartModal: SizeChartModalComponent;
  @ViewChild("deliveryReturnModal") DeliveryReturnModal: DeliveryReturnModalComponent;
  @ViewChild("questionModal") QuestionModal: QuestionModalComponent;

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  public policy: string;
  public isLogin: boolean;

  constructor(private store: Store) {
    this.themeOptions$.subscribe(option => {
      this.policy = option?.product?.shipping_and_return;
    })
    this.isLogin = !!this.store.selectSnapshot(state => state.auth && state.auth.access_token)
  }

}
