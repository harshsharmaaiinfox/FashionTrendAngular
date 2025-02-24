import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../../shared/interface/store.interface';

@Component({
  selector: 'app-vendor-contain',
  templateUrl: './vendor-contain.component.html',
  styleUrl: './vendor-contain.component.scss'
})
export class VendorContainComponent {

  @Input() store: Stores;

}
