import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Attachment } from '../../../../../shared/interface/attachment.interface';

@Component({
  selector: 'app-size-chart-modal',
  templateUrl: './size-chart-modal.component.html',
  styleUrls: ['./size-chart-modal.component.scss']
})
export class SizeChartModalComponent {

  @ViewChild("sizeChartModal", { static: false }) SizeChartModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public image: Attachment;

  constructor( private modalService: NgbModal ){}

  async openModal(image: Attachment) {
    this.image = image;
    this.modalOpen = true;
    this.modalService.open(this.SizeChartModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'theme-modal modal-lg'
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
}
