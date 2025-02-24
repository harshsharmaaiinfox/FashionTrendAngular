import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-theme-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent {

  @Input() theme: string = 'paris';
  @Input() data: any;
  
}
