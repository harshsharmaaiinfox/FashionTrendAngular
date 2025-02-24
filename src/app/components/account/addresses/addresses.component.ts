import { Component, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from "../../../shared/interface/account.interface";
import { AccountState } from '../../../shared/state/account.state';
import { DeleteAddress } from '../../../shared/action/account.action';
import { AddressModalComponent } from '../../../shared/components/widgets/modal/address-modal/address-modal.component';
import { DeleteModalComponent } from '../../../shared/components/widgets/modal/delete-modal/delete-modal.component';
import { UserAddress } from '../../../shared/interface/user.interface';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent {

  @Select(AccountState.user) user$: Observable<AccountUser>;

  @ViewChild("addressModal") AddressModal: AddressModalComponent;
  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  constructor(private store: Store) {
  }

  delete(action: string, data: UserAddress) {
    if(action == 'delete' && data)
      this.store.dispatch(new DeleteAddress(data.id));
  }

}
