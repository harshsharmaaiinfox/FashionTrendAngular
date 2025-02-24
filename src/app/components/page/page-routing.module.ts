import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageResolver } from '../../shared/resolvers/page.resolver';

import { PageComponent } from './page.component';
import { FaqComponent } from './faq/faq.component';
import { Error404Component } from './error404/error404.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OfferComponent } from './offer/offer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'page/:slug',
    component: PageComponent,
    resolve: {
      data: PageResolver
    }
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'offers',
    component: OfferComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
