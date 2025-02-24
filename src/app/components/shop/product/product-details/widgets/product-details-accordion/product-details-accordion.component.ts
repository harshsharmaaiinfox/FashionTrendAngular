import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuestionAnswersState } from '../../../../../../shared/state/questions-answers.state';
import { QnAModel } from '../../../../../../shared/interface/questions-answers.interface';
import { GetQuestionAnswers } from '../../../../../../shared/action/questions-answers.action';
import { GetReview } from '../../../../../../shared/action/review.action';
import { ReviewState } from '../../../../../../shared/state/review.state';
import { ReviewModel } from '../../../../../../shared/interface/review.interface';

@Component({
  selector: 'app-product-details-accordion',
  templateUrl: './product-details-accordion.component.html',
  styleUrls: ['./product-details-accordion.component.scss']
})
export class ProductDetailsAccordionComponent {

  @Input() product: Product | null;

  @Select(QuestionAnswersState.questionsAnswers) question$: Observable<QnAModel>;
  @Select(ReviewState.review) review$: Observable<ReviewModel>;

  constructor(private store: Store){}

  ngOnChanges(changes: SimpleChanges) {
    let product = changes['product']?.currentValue;
    this.store.dispatch(new GetQuestionAnswers({product_id: product.id}));
    this.store.dispatch(new GetReview({product_id: product.id}));
  }
}
