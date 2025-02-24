import { Attachment } from './../../../../../../shared/interface/attachment.interface';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as data from  '../../../../../../shared/data/owl-carousel';

@Component({
  selector: 'app-video-play-modal',
  templateUrl: './video-play-modal.component.html',
  styleUrl: './video-play-modal.component.scss'
})
export class VideoPlayModalComponent {

  @ViewChild("videoPlayModal", { static: true }) VideoPlayModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = true;
  public video: Attachment;
  public galleries: Attachment[];
  public type: string;
  public singleSlider = data.singleSlider;
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  constructor(private modalService: NgbModal){
  }

  async openModal(video: any, type: string) {
    this.type = type;
    if(this.type === 'img'){
      this.galleries = video;
    } else {
      this.video = video;
    }
    this.modalOpen = true;
    this.modalService.open(this.VideoPlayModal, {
      ariaLabelledBy: 'video-modal',
      centered: true,
      windowClass: 'theme-modal modal-lg exit-modal audio-video-modal'
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
