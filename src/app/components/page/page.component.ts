import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PageState } from '../../shared/state/page.state';
import { Page } from '../../shared/interface/page.interface';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { PageService } from '../../shared/services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  @Select(PageState.selectedPage) selectedPage$: Observable<Page>;

  public breadcrumb: Breadcrumb = {
    title: "Page",
    items: []
  }

  constructor(private meta: Meta, public pageService: PageService){
    this.selectedPage$.subscribe(res =>{
      res['content'] = `
      <h1>About us</h1><p>Welcome to Fashion With Trends Fashion, your one-stop destination for high-quality and stylish clothing. We specialize in offering a diverse range of apparel designed to meet the latest fashion trends while ensuring comfort and durability. Our brand is dedicated to creating an exceptional shopping experience for fashion enthusiasts of all ages.</p><p>Our journey began with a simple vision: to provide fashionable and affordable clothing that reflects authenticity and reliability. Today, Fashion With Trends Fashion stands as a symbol of quality, integrity, and excellence. We continuously work towards enhancing our offerings, ensuring that every product we provide meets the highest standards.</p><h2>Our Vision</h2><p>Our vision is to be a globally recognized fashion brand known for its commitment to quality, customer satisfaction, and innovation. We aim to redefine fashion by blending modern trends with timeless elegance while ensuring accessibility for all.</p><h2>Our Mission</h2><p>At Fashion With Trends Fashion, our mission is to provide stylish, high-quality, and sustainable fashion choices. We are dedicated to making every customer feel confident and comfortable in our clothing. Our goal is to revolutionize the shopping experience through innovation, affordability, and unmatched customer service.</p><h2>Our Values</h2><ul><li><p>Customer Satisfaction: We prioritize the needs of our customers and strive to provide the best shopping experience possible.</p></li><li><p>Quality Excellence: We are committed to using premium materials and maintaining high production standards.</p></li><li><p>Innovation: We embrace creativity and technology to stay ahead in the fashion industry.</p></li><li><p>Integrity: We uphold honesty and transparency in all our business practices.</p></li><li><p>Sustainability: We promote eco-friendly practices and ethical fashion choices to ensure a better future.</p></li></ul><h2>Why Choose Us?</h2><p>At Fashion With Trends Fashion, we believe that fashion should be accessible to everyone without compromising on quality. Our designs are inspired by global trends, yet tailored to suit individual styles. Whether you're looking for casual wear, formal attire, or trendy outfits, we have something for everyone.</p><p>We stand apart from the competition by focusing on customer needs, affordability, and sustainable fashion. By choosing Fashion With Trends Fashion, you're not just buying clothes – you're embracing a lifestyle of elegance and confidence.</p>`;
      const page = res;
      this.breadcrumb.items = [];
      this.breadcrumb.title = page.title;
      this.breadcrumb.items.push({ label: 'Page', active: true }, { label: page.title, active: false });
      page?.meta_title && this.meta.updateTag({property: 'og:title', content: page?.meta_title});
      page?.meta_description && this.meta.updateTag({property: 'og:description', content: page?.meta_description});
    });
  }

}
