import { Component, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User, UserAddress } from '../../../shared/interface/user.interface';
import { AccountState } from '../../../shared/state/account.state';
import { EditProfileModalComponent } from '../../../shared/components/widgets/modal/edit-profile-modal/edit-profile-modal.component';
import { ChangePasswordModalComponent } from '../../../shared/components/widgets/modal/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @Select(AccountState.user) user$: Observable<User>;

  @ViewChild("profileModal") ProfileModal: EditProfileModalComponent;
  @ViewChild("passwordModal") PasswordModal: ChangePasswordModalComponent;

  public address: UserAddress | null;

  constructor() {
    this.user$.subscribe(user => {
      this.address = user?.address?.length ? user?.address?.[0] : null;
    });
  }

}
