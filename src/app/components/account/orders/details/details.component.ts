import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { DownloadInvoice, ViewOrder } from '../../../../shared/action/order.action';
import { GetOrderStatus } from '../../../../shared/action/order-status.action';
import { OrderState } from '../../../../shared/state/order.state';
import { OrderStatusState } from '../../../../shared/state/order-status.state';
import { Order } from '../../../../shared/interface/order.interface';
import { OrderStatusModel } from '../../../../shared/interface/order-status.interface';
import { RefundModalComponent } from '../../../../shared/components/widgets/modal/refund-modal/refund-modal.component';
import { PayModalComponent } from '../../../../shared/components/widgets/modal/pay-modal/pay-modal.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class OrderDetailsComponent {

  @Select(OrderStatusState.orderStatus) orderStatus$: Observable<OrderStatusModel>;
  @ViewChild("refundModal") RefundModal: RefundModalComponent;
  @ViewChild("payModal") PayModal: PayModalComponent;

  private destroy$ = new Subject<void>();
  public isLogin: boolean;

  public order: Order;

  constructor(private store: Store,
    private route: ActivatedRoute) {
    this.store.dispatch(new GetOrderStatus());
  }

  ngOnInit() {
    this.isLogin = !!this.store.selectSnapshot(state => state.auth && state.auth.access_token)
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new ViewOrder(params['id']))
                      .pipe(mergeMap(() => this.store.select(OrderState.selectedOrder)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(order => {
        this.order = order!;
      });
  }

  download(id: number){
    this.store.dispatch(new DownloadInvoice({order_number: id}))
  }

  ngOnDestroy() { 
    this.destroy$.next();
    this.destroy$.complete();
  }

}
