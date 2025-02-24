import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {
  @Input() class: string = "no-data-added";
  @Input() image: string;
  @Input() text: string;
  @Input() description: string;
}
