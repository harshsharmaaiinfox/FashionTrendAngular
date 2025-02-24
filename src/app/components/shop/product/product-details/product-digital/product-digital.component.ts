import { Component, Input, ViewChild } from '@angular/core';
import { Product, Variation } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { Select, Store } from '@ngxs/store';
import { AddToWishlist, DeleteWishlist } from '../../../../../shared/action/wishlist.action';
import { AddToCompare } from '../../../../../shared/action/compare.action';
import { Cart, CartAddOrUpdate } from '../../../../../shared/interface/cart.interface';
import { CartState } from '../../../../../shared/state/cart.state';
import { Observable } from 'rxjs';
import { AddToCart } from '../../../../../shared/action/cart.action';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { VideoPlayModalComponent } from '../widgets/video-play-modal/video-play-modal.component';

@Component({
  selector: 'app-product-digital',
  templateUrl: './product-digital.component.html',
  styleUrl: './product-digital.component.scss'
})
export class ProductDigitalComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  @ViewChild("videoPlayModal") VideoPlayModal: VideoPlayModalComponent;
  
  public productQty: number = 1;
  public selectedVariation: Variation | null;
  public totalPrice: number = 0;
  public cartItem: Cart | null;
  public url: string = environment.baseURL;

  public videType: string[] = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType: string[] = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;

  constructor(private store: Store,
    private router: Router){}

  ngOnChanges() {
    this.cartItem$.subscribe(items => {
      this.cartItem = items.find(item => item.product.id == this.product.id)!;
    });
  }
  
  addToWishlist(product: Product){
    product['is_wishlist'] = !product['is_wishlist'];
    let action = product['is_wishlist']? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }

  addToCompare(id: number) {
    this.store.dispatch(new AddToCompare({ product_id: id }));
  }

  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
    this.wholesalePriceCal();
  }

  wholesalePriceCal() {
    let wholesale = this.product.wholesales.find(value => value.min_qty <= this.productQty && value.max_qty >= this.productQty) || null;
    if(wholesale && this.product.wholesale_price_type == 'fixed') {
      this.totalPrice = this.productQty * wholesale.value;
    } else if(wholesale && this.product.wholesale_price_type == 'percentage') {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product.sale_price);
      this.totalPrice = this.totalPrice - (this.totalPrice * (wholesale.value / 100));
    } else {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product.sale_price);
    }
  }

  externalProductLink(link: string) {
    if(link) {
      window.open(link, "_blank");
    }
  }
  
  addToCart(product: Product, buyNow?: boolean) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: this.cartItem && (this.selectedVariation && this.cartItem?.variation && 
          this.selectedVariation?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
        product_id: product?.id,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id ? this.selectedVariation?.id : null,
        quantity: this.productQty
      }
      this.store.dispatch(new AddToCart(params)).subscribe({
        complete: () => {
          if(buyNow) {
            this.router.navigate(['/checkout']);
          }
        }
      });
    }
  }

  shareOnFacebook(slug: string) {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url+'/product/'+slug)}`;
    window.open(facebookShareUrl, '_blank');
  }

  shareOnInstagram(slug: string) {
    const whatsappShareUrl = `https://api.instagram.com/send?text=${encodeURIComponent(this.url+'/product/'+slug)}`;
    window.open(whatsappShareUrl, '_blank');
  }

  shareOnWhatsApp(slug: string) {
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.url+'/product/'+slug)}`;
    window.open(whatsappShareUrl, '_blank');
  }


}
