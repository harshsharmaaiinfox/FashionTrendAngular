import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

export interface Alert {
  type: string | null;
  message: string | null;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  public alert: Alert = {
    type: null,
    message: null
  };

  constructor(private notificationService: NotificationService) { 
    this.notificationService.alertSubject.subscribe(alert => {
      this.alert = <Alert>alert;
    })
  }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.notificationService.notification = true;
  }

}
