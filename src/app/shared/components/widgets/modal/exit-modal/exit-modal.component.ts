import { Component, HostListener, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateSession } from '../../../../../shared/action/theme-option.action';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../interface/theme-option.interface';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-exit-modal',
  templateUrl: './exit-modal.component.html',
  styleUrls: ['./exit-modal.component.scss']
})
export class ExitModalComponent {

  @ViewChild("exitModal", { static: true }) ExitModal: TemplateRef<string>;

  @Select(ThemeOptionState.exit) exit$: Observable<boolean>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public closeResult: string;
  public modalOpen: boolean = true;
  public isTabInFocus = true;
  public exit: boolean;
  public themeOption: Option;
  public storageURL = environment.storageURL;

  constructor(private modalService: NgbModal, private store: Store){
    this.exit$.subscribe(res => this.exit = res);
    this.themeOption$.subscribe(res => this.themeOption = res);
  }

  @HostListener('window:mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    if (event.clientY <= 0) {
      if(this.exit === true){
        this.openModal();
        this.store.dispatch(new UpdateSession('exit', false));
      }
    }
  }

  async openModal() {
    localStorage.setItem("exit", 'true');
    this.modalOpen = true;
    this.modalService.open(this.ExitModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'theme-modal modal-lg exit-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
