import { Component, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  public closeResult: string;
  public modalOpen: boolean = false;

  @ViewChild("confirmationModal", { static: false }) ConfirmationModal: TemplateRef<any>;

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.ConfirmationModal, {
      ariaLabelledBy: 'Confirmation-Modal',
      centered: true,
      windowClass: 'theme-modal text-center'
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

  confirm() {
    this.confirmed.emit(true);
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
