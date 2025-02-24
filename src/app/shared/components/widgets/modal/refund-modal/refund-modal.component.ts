import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Select2Data } from 'ng-select2-component';
import { SendRefundRequest } from '../../../../../shared/action/refund.action';
import { Product } from '../../../../../shared/interface/product.interface';

@Component({
  selector: 'app-refund-modal',
  templateUrl: './refund-modal.component.html',
  styleUrls: ['./refund-modal.component.scss']
})
export class RefundModalComponent {

  @ViewChild("refundModal", { static: false }) RefundModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public product: Product;
  public form: FormGroup;

  public option: Select2Data = [
    {
      label: 'Wallet',
      value: 'wallet',
    },
    {
      label: 'Paypal',
      value: 'paypal',
    },
    {
      label: 'Bank',
      value: 'bank',
    }
  ]

  constructor(private modalService: NgbModal, private store: Store ){
    this.form = new FormGroup({
      order_id: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      payment_type: new FormControl('', [Validators.required]),
      product_id: new FormControl()
    })
  }

  async openModal(product: Product, order_id: number) {
    this.product = product;
    this.form.controls['order_id'].setValue(order_id);
    this.form.get('product_id')?.patchValue(product.id);
    this.modalOpen = true;
    this.modalService.open(this.RefundModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'theme-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sendRequest(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new SendRefundRequest(this.form.value)).subscribe({
        complete: () => {
          this.form.reset();
          this.modalService.dismissAll();
        }
      });
    }
  }
}
