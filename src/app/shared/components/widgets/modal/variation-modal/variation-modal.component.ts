import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import { Product, Variation } from '../../../../interface/product.interface';
import { ReplaceCart } from '../../../../action/cart.action';

@Component({
  selector: 'app-variation-modal',
  templateUrl: './variation-modal.component.html',
  styleUrls: ['./variation-modal.component.scss']
})
export class VariationModalComponent {

  @ViewChild("variationModal", { static: false }) VariationModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public item: Cart;

  public product: Product;
  public productQty: number = 1;
  public selectedVariation: Variation | null;

  constructor(private modalService: NgbModal,
    private store: Store){}

  async openModal(item: Cart) {
    this.item = item;
    this.product = item.product;
    this.productQty = item.quantity;
    this.modalOpen = true;
    this.modalService.open(this.VariationModal, {
      ariaLabelledBy: 'variation-Modal',
      centered: true,
      windowClass: 'theme-modal modal-md variation-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
    this.checkStockAvailable();
  }

  checkStockAvailable() {
    if(this.selectedVariation) {
      this.selectedVariation['stock_status'] = this.selectedVariation?.quantity < this.productQty ? 'out_of_stock' : 'in_stock';
    } else {
      this.product['stock_status']  = this.product?.quantity < this.productQty ? 'out_of_stock' : 'in_stock';
    }
  }

  replaceCart(product: Product) {
    if(product && this.item) {
      const params: CartAddOrUpdate = {
        id: this.item.id,
        product_id: product?.id,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation ? this.selectedVariation.id : null,
        quantity: this.productQty
      }

      this.store.dispatch(new ReplaceCart(params)).subscribe({
        complete: () => {
          this.modalService.dismissAll();
        }
      });
    }
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
}
