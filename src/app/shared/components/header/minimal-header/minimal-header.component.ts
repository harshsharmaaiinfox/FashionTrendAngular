import { Component, HostListener, Input } from '@angular/core';
import { Option } from '../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-minimal-header',
  templateUrl: './minimal-header.component.html',
  styleUrls: ['./minimal-header.component.scss']
})
export class MinimalHeaderComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() sticky: boolean | number | undefined; // Default false
  @Input() class: string | undefined;

  public stick: boolean = false;
  public active: boolean = false;

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) {
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  toggle(val: boolean){
    this.active = val;
  }
}
