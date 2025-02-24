import { Component, Input } from '@angular/core';
import { TopBarContent } from '../../../../interface/theme-option.interface';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {

  @Input() content: TopBarContent[] | undefined;

}
