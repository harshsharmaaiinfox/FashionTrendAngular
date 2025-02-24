import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { CouponState } from '../../../shared/state/coupon.state';
import { CouponService } from './../../../shared/services/coupon.service';
import { GetCoupons } from '../../../shared/action/coupon.action';
import { CouponModel } from '../../../shared/interface/coupon.interface';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {

  public skeletonItems = Array.from({ length: 8 }, (_, index) => index);
  public breadcrumb: Breadcrumb = {
    title: "Offer",
    items: [{ label: "Offer", active: true }]
  }

  @Select(CouponState.coupon) coupon$: Observable<CouponModel>;

  constructor(private store: Store, public couponService: CouponService){
    this.store.dispatch(new GetCoupons({ status: 1 }))
  }

  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }
}
