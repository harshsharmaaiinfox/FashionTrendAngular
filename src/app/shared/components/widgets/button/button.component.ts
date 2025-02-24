import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoaderState } from '../../../state/loader.state';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() class: string = 'btn btn-animation w-100 justify-content-center';
  @Input() iconClass: string | null;
  @Input() id: string;
  @Input() label: string;
  @Input() type: string = 'submit';
  @Input() spinner: boolean = true;
  @Input() disabled: boolean = false;

  public buttonId: string | null;

  @Select(LoaderState.buttonSpinner) public spinnerStatus$: Observable<boolean>;

  constructor() {
    this.spinnerStatus$.subscribe(res => {
      if(res == false) {
        this.buttonId = null;
      }
    });
  }

  public onClick(id: string) {
    this.buttonId = id;
  }

}
