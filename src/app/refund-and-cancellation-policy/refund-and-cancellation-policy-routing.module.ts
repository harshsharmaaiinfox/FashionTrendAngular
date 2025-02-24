import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefundAndCancellationPolicyComponent } from './refund-and-cancellation-policy.component';

const routes: Routes = [
   { path: '', component: RefundAndCancellationPolicyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundAndCancellationPolicyRoutingModule { }
