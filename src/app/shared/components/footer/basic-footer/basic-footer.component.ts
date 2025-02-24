import { Component, Input } from '@angular/core';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { Footer } from '../../../../shared/interface/theme.interface';

@Component({
  selector: 'app-basic-footer',
  templateUrl: './basic-footer.component.html',
  styleUrls: ['./basic-footer.component.scss']
})
export class BasicFooterComponent {

  @Input() data: Option | null;
  @Input() footer: Footer;

  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false
  };

  toggle(value: string){
    this.active[value] = !this.active[value];
  }
}
