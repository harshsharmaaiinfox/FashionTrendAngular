import { Component, Input } from '@angular/core';
import { Link } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-footer-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
  
  @Input() links: Link[] = [];

}
