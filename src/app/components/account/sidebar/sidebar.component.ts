import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interface/user.interface';
import { AccountState } from '../../../shared/state/account.state';
import { Notification } from '../../../shared/interface/notification.interface';
import { NotificationState } from '../../../shared/state/notification.state';
import { Logout } from '../../../shared/action/auth.action';
import { ConfirmationModalComponent } from '../../../shared/components/widgets/modal/confirmation-modal/confirmation-modal.component';
import { UpdateUserProfile } from '../../../shared/action/account.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() show: boolean;
  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  @Select(NotificationState.notification) notification$: Observable<Notification[]>;
  @Select(AccountState.user) user$: Observable<User>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  public unreadNotificationCount: number;

  constructor(private store: Store) {
    this.notification$.subscribe((notification) => {
      this.unreadNotificationCount = notification?.filter(item => !item.read_at)?.length;
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  openMenu(value: boolean){
    this.menu.emit(value)
  }

   uploadImage(event:any){
    if(event?.target?.files){
      let form = new FormData();
      form.append("profile_image", event.target.files[0]);
      form.append("_method", "PUT");
      this.store.dispatch(new UpdateUserProfile(form));
    } else {
      let form = new FormData();
      form.append("profile_image_id", '');
      form.append("_method", "PUT");
      this.store.dispatch(new UpdateUserProfile(form));
    }
  }     

}
