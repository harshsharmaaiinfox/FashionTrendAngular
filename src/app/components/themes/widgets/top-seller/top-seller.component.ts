import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreState } from '../../../../shared/state/store.state';
import { Stores, StoresModel } from '../../../../shared/interface/store.interface';

@Component({
  selector: 'app-top-seller',
  templateUrl: './top-seller.component.html',
  styleUrl: './top-seller.component.scss'
})
export class TopSellerComponent {

  @Input() sellerIds: number[];

  public sellers: Stores[];

  @Select(StoreState.store) store$: Observable<StoresModel>;

  ngOnInit(){
    this.store$.subscribe(stores =>{
      if(this.sellerIds?.length)
        this.sellers = stores.data.filter(seller => this.sellerIds.includes(seller.id)); 
    })
  }
}
