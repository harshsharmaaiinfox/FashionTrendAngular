import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WalletState } from '../../../shared/state/wallet.state';
import { GetUserTransaction } from '../../../shared/action/wallet.action';
import { Wallet } from '../../../shared/interface/wallet.interface';
import { Params } from '../../../shared/interface/core.interface';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {

  @Select(WalletState.wallet) wallet$: Observable<Wallet>;

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
