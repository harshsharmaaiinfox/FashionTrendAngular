import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent {

  public form: FormGroup;

  public breadcrumb: Breadcrumb = {
    title: "Order Tracking",
    items: [{ label: 'Order Tracking', active: true }]
  }

  constructor(private store: Store, private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      order_number: new FormControl('', [Validators.required]),
      email_or_phone: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.router.navigate([ 'order/details' ], { queryParams: this.form.value });
    }
  }

}
