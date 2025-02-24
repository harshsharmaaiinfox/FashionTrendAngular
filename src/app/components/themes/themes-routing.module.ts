import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemesComponent } from './themes.component';
import { HomeResolver } from '../../shared/resolvers/home.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: ThemesComponent
  },
  {
    path: '',
    component: ThemesComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      data: HomeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemesRoutingModule { }
