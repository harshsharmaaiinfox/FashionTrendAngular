import { Component, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  public closeResult: string;
  public modalOpen: boolean = false;
  public userAction = {};

  @ViewChild("deleteModal", { static: false }) DeleteModal: TemplateRef<string>;

  @Output() deleteItem: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  async openModal(action: string, data: any) {
    this.modalOpen = true;
    this.userAction = {
      actionToPerform: action,
      data: data
    };
    this.modalService.open(this.DeleteModal, {
      ariaLabelledBy: 'Delete-Modal',
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

  delete() {
    this.deleteItem.emit(this.userAction);
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
