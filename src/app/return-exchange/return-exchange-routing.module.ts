import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnExchangeComponent } from './return-exchange/return-exchange.component';

const routes: Routes = [
  { path: '', component: ReturnExchangeComponent }, // Root path for this module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnExchangeRoutingModule {}
