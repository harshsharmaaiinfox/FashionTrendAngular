import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
  selector: 'app-seller-store-social-links',
  templateUrl: './seller-store-social-links.component.html',
  styleUrls: ['./seller-store-social-links.component.scss']
})
export class SellerStoreSocialLinksComponent {

  @Input() store: Stores;

}
