import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Product } from '../../../shared/interface/product.interface';
import { ProductState } from '../../../shared/state/product.state';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Select(ProductState.selectedProduct) product$: Observable<Product>;
  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Product",
    items: []
  }
  public layout: string = 'product_digital';
  public product: Product;
  public isScrollActive = false;

  constructor(private route: ActivatedRoute, private seoService: SeoService) {
    this.product$.subscribe(product => {
      // this.seoService.seo();
      this.breadcrumb.items = [];
      this.breadcrumb.title = product.name;
      this.breadcrumb.items.push({ label: 'Product', active: true }, { label: product.name, active: false });
    });

    // For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      if(params['layout']) {
        this.layout = params['layout'];
      } else {
        // Get Product Layout
        this.themeOptions$.subscribe(option => {
          this.layout = option?.product && option?.product?.product_layout ? option?.product?.product_layout : 'product_thumbnail';
        });
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const button = document.querySelector('.scroll-button');
    if (button) {
      const buttonRect = button.getBoundingClientRect();
      if (buttonRect.bottom < window.innerHeight && buttonRect.bottom < 0) {
        this.isScrollActive = true;
        document.body.classList.add('stickyCart');
      } else {
        this.isScrollActive = false;
        document.body.classList.remove('stickyCart');
      }
    }
  }

  ngOnDestroy(){
    document.body.classList.remove('stickyCart')
  }

}
