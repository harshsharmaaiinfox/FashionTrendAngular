import { Component, Input, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from '../../../../action/auth.action';
import { AccountUser } from '../../../../interface/account.interface';
import { AccountState } from '../../../../state/account.state';
import { AuthState } from '../../../../state/auth.state';
import { ConfirmationModalComponent } from '../../../widgets/modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {

  @Input() style: string = 'basic';

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<string>;
  @Select(AccountState.user) user$: Observable<AccountUser>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }

}
