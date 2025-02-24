import { Component, ViewChild, TemplateRef, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../../../shared/interface/product.interface';

@Component({
  selector: 'app-deals-modal',
  templateUrl: './deals-modal.component.html',
  styleUrls: ['./deals-modal.component.scss']
})
export class DealsModalComponent {

  @ViewChild("dealsModal", { static: false }) dealsModal: TemplateRef<any>;

  @Input() products: Product[];

  public closeResult: string;
  public modalOpen: boolean = false;

  constructor(private modalService: NgbModal) {}

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.dealsModal, {
      ariaLabelledBy: 'Deal-Modal',
      centered: true,
      windowClass: 'theme-modal deal-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModal(){
    this.modalService.dismissAll();
  }
}
