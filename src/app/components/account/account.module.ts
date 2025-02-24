import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { AccountComponent } from './account.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { PointComponent } from './point/point.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/details/details.component';
import { RefundComponent } from './refund/refund.component';
import { AddressesComponent } from './addresses/addresses.component';
import { NotificationComponent } from './notification/notification.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { DownloadsComponent } from './downloads/downloads.component';
 
@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
    SidebarComponent,
    WalletComponent,
    PointComponent,
    OrdersComponent,
    OrderDetailsComponent,
    RefundComponent,
    AddressesComponent,
    NotificationComponent,
    BankDetailsComponent,
    DownloadsComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class AccountModule { }
