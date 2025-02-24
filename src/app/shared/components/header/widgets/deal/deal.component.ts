import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { ProductState } from '../../../../../shared/state/product.state';
import { DealsModalComponent } from '../../../widgets/modal/deals-modal/deals-modal.component';
import { GetDealProducts } from '../../../../../shared/action/product.action';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent {

  @Input() style: string = 'basic';
  @Input() data: Option | null;
 
  @ViewChild("dealsModal") DealsModal: DealsModalComponent;

  @Select(ProductState.dealProducts) dealProducts$: Observable<ProductModel>;

  public dealProducts: Product[];
  public ids: number[]; 

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    this.ids = changes['data']?.currentValue?.header?.today_deals;
  }

  ngOnInit(){
    if(Array.isArray(this.ids)){
      this.store.dispatch(new GetDealProducts({ids: this.ids?.join()})).subscribe({
        next: (val) => {
         this.dealProducts = val?.product?.dealProducts;
        }
      });
    }
  }
}
