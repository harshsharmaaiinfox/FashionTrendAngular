import { Component, Input, SimpleChange, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { GetUserDetails } from '../../../../../../shared/action/account.action';
import { QuestionModalComponent } from '../../../../../../shared/components/widgets/modal/question-modal/question-modal.component';
import { AccountUser } from '../../../../../../shared/interface/account.interface';
import { Product } from '../../../../../../shared/interface/product.interface';
import { QuestionAnswers } from '../../../../../../shared/interface/questions-answers.interface';
import { QuestionsAnswersService } from '../../../../../../shared/services/questions-answers.service';
import { AccountState } from '../../../../../../shared/state/account.state';
import { Feedback } from '../../../../../../shared/action/questions-answers.action';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent {

  public user: AccountUser;
  public question = new FormControl();
  public isLogin: boolean = false;
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);
  private destroy$ = new Subject<void>();

  @Input() product: Product;
  @Input() questionAnswers: QuestionAnswers[];

  @ViewChild("questionModal") QuestionModal: QuestionModalComponent;

  @Select(AccountState.user) user$: Observable<AccountUser>;

  constructor(private store: Store, public questionAnswersService: QuestionsAnswersService){
    this.isLogin = !!this.store.selectSnapshot(state => state.auth && state.auth.access_token)
    if(this.isLogin){
      this.store.dispatch(new GetUserDetails());
    }
  }

  feedback(qna: QuestionAnswers, value: string) {
    const data = {
      question_and_answer_id : qna.id,
      reaction: value
    }
    this.store.dispatch(new Feedback(data, value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
