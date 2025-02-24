import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserAddress } from '../../../../shared/interface/user.interface';

@Component({
  selector: 'app-address-block',
  templateUrl: './address-block.component.html',
  styleUrls: ['./address-block.component.scss']
})
export class AddressBlockComponent {

  @Input() addresses?: UserAddress[] = [];
  @Input() type: string = 'shipping';

  @Output() selectAddress: EventEmitter<number> = new EventEmitter();

  constructor() { }
  
  ngOnChanges() {
    // Automatically emit the selectAddress event for the first item if it's available
    if (this.addresses && this.addresses.length > 0) {
      const firstAddressId = this.addresses[0].id;
      this.selectAddress.emit(firstAddressId);
    }
  }

  set(event: Event) {
    this.selectAddress.emit(Number((<HTMLInputElement>event.target)?.value));
  }

}
