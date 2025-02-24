import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingDelevaryComponent } from './shipping-delevary/shipping-delevary.component';

const routes: Routes = [
  { path: '', component: ShippingDelevaryComponent }, // Root path for this module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingDelevaryRoutingModule {}
