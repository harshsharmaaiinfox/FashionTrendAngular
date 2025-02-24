import { Component, Input } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-product-social-share',
  templateUrl: './product-social-share.component.html',
  styleUrls: ['./product-social-share.component.scss']
})
export class ProductSocialShareComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  url: string = environment.baseURL;

  shareOnFacebook(slug: string) {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url+'/product/'+slug)}`;
    window.open(facebookShareUrl, '_blank');
  }

  shareOnTwitter(slug: string) {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.url+'/product/'+slug)}`;
    window.open(twitterShareUrl, '_blank');
  }

  shareOnLinkedIn(slug: string) {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.url+'/product/'+slug)}`;
    window.open(linkedInShareUrl, '_blank');
  }

  shareOnWhatsApp(slug: string) {
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.url+'/product/'+slug)}`;
    window.open(whatsappShareUrl, '_blank');
  }

  shareViaEmail(slug: string) {
    const subject = 'Check out this awesome product!';
    const body = `I thought you might be interested in this product: ${this.url+'/product/'+slug}`;
    const emailShareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailShareUrl; // Use location.href to open the default email client
  }

}
