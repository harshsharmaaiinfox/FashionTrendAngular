import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './page-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { PageComponent } from './page.component';
import { FaqComponent } from './faq/faq.component';
import { Error404Component } from './error404/error404.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SkeletonPageComponent } from './skeleton-page/skeleton-page.component';
import { OfferComponent } from './offer/offer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchComponent } from './search/search.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PageComponent,
    FaqComponent,
    Error404Component,
    ContactUsComponent,
    SkeletonPageComponent,
    OfferComponent,
    AboutUsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class PagesModule { }
