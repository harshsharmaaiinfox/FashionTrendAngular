import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermConditionComponent } from './term-condition/term-condition.component';

const routes: Routes = [
  { path: '', component: TermConditionComponent }, // Root path for this module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermConditionRoutingModule {}
