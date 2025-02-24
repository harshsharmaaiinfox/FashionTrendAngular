import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Values, DeliveryBlock } from '../../../../shared/interface/setting.interface';

@Component({
  selector: 'app-delivery-block',
  templateUrl: './delivery-block.component.html',
  styleUrls: ['./delivery-block.component.scss']
})
export class DeliveryBlockComponent {

  @Input() setting: Values;

  @Output() selectDelivery: EventEmitter<DeliveryBlock> = new EventEmitter();

  public selectedIndex: number;
  public deliveryType: string | null = null;
  public delivery_description: string | null = null;
  public delivery_interval: string | null = null;

  ngOnInit() {
    if(this.setting?.delivery){
      // Automatically emit the selectAddress event for the first item if it's available
      let delivery: DeliveryBlock = {
        delivery_description: this.setting.delivery?.default?.title+ ' | ' +this.setting.delivery?.default?.description,
        delivery_interval: this.delivery_interval,
      }
      this.selectDelivery.emit(delivery);
    }
  }

  setDeliveryDescription(value: string, type: string) {
    this.delivery_description = value!;
    this.deliveryType = type;
    let delivery: DeliveryBlock = {
      delivery_description: this.delivery_description,
      delivery_interval: this.delivery_interval,
    }
    this.selectDelivery.emit(delivery);
  }

  setDeliveryInterval(value: string, index: number) {
    this.selectedIndex = index!;
    this.delivery_interval = value;
    let delivery : DeliveryBlock = {
      delivery_description: this.delivery_description,
      delivery_interval: this.delivery_interval,
    }
    this.selectDelivery.emit(delivery);
  }

}
