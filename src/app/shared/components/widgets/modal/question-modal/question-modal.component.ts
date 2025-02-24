import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { SendQuestion, UpdateQuestionAnswers } from '../../../../../shared/action/questions-answers.action';
import { Product } from '../../../../../shared/interface/product.interface';
import { QuestionAnswers } from '../../../../../shared/interface/questions-answers.interface';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent {

  @ViewChild("questionModal", { static: false }) QuestionModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;

  public product: Product;
  public question = new FormControl();
  public type = 'crate'
  public id: number;

  constructor( private modalService: NgbModal, private store: Store, private router: Router ){}

  async openModal(product: Product, qna?: QuestionAnswers) {
    if(qna){
      this.type = 'edit'
      this.id = qna.id;
      this.question.patchValue(qna.question);
    }
    this.product = product;
    this.modalOpen = true;
    this.modalService.open(this.QuestionModal, {
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

  submit(){
    let data = {
      question: this.question.value,
      product_id: this.product.id,
      answer: ''
    }
    let action = new SendQuestion(data)
    if(data.question || data.product_id){
      if(this.type == 'edit' && this.id) {
        action = new UpdateQuestionAnswers(data, this.id)
      }
      this.store.dispatch(action).subscribe({
        complete:() => {
          this.modalService.dismissAll();
        }
      })
    }
  }
}
