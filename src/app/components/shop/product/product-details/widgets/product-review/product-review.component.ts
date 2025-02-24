import { Component, Input, ViewChild } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ReviewModalComponent } from '../../../../../../shared/components/widgets/modal/review-modal/review-modal.component';
import { Review } from '../../../../../../shared/interface/review.interface';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent {

  @Input() product: Product | null;
  @Input() reviews: Review[] = [];

  @ViewChild("reviewModal") ProfileModal: ReviewModalComponent;

}
