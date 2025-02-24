import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPaymentDetails, UpdatePaymentDetails } from '../../../shared/action/payment-details.action';
import { PaymentDetailsState } from '../../../shared/state/payment-details.state';
import { PaymentDetails } from '../../../shared/interface/payment-details.interface';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent {

  @Select(PaymentDetailsState.paymentDetails) paymentDetails$: Observable<PaymentDetails>;
  
  public form: FormGroup;
  public active = 'bank';

  constructor(private store: Store) {
    this.form = new FormGroup({
      bank_account_no: new FormControl(),
      bank_name: new FormControl(),
      bank_holder_name: new FormControl(),
      swift: new FormControl(),
      ifsc: new FormControl(),
      paypal_email: new FormControl('', [Validators.email]),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetPaymentDetails());
    this.paymentDetails$.subscribe(paymentDetails => {
      this.form.patchValue({
        bank_account_no: paymentDetails?.bank_account_no,
        bank_name: paymentDetails?.bank_name,
        bank_holder_name: paymentDetails?.bank_holder_name,
        swift:paymentDetails?.swift,
        ifsc: paymentDetails?.ifsc,
        paypal_email: paymentDetails?.paypal_email
      })
    });
  }

  submit(){    
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new UpdatePaymentDetails(this.form.value))
    }
  }

}
