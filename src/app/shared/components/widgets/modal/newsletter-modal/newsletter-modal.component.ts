import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateSession } from '../../../../../shared/action/theme-option.action';
import { NewsletterService } from '../../../../../shared/services/newsletter.service';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Subscription } from '../../../../action/subscription.action';
import { Option } from '../../../../interface/theme-option.interface';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  styleUrls: ['./newsletter-modal.component.scss']
})
export class NewsletterModalComponent {

  @ViewChild("newsletterModal", { static: true }) NewsletterModal: TemplateRef<string>;

  @Select(ThemeOptionState.newsletter) newsletter$: Observable<boolean>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public closeResult: string;
  public modalOpen: boolean = true;
  public newsletter: boolean;
  public themeOption: Option;
  public email = new FormControl('', [Validators.email]);
  public isSubmit: boolean = false; 
  public storageURL = environment.storageURL;

  constructor(private modalService: NgbModal, private store: Store){
    this.newsletter$.subscribe(res => this.newsletter = res);
    this.themeOption$.subscribe(res => this.themeOption = res);

  }

  ngAfterViewInit(): void {
    if(this.newsletter === true){
      setTimeout(() => {
      this.openModal();
      }, 3000);
      this.store.dispatch(new UpdateSession('newsletter', false));
    }
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.NewsletterModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'theme-modal modal-lg newsletter-modal'
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

  submit(){
    this.isSubmit = true;
    if(this.email.valid){
      this.store.dispatch(new Subscription({email: this.email.value!}))
      this.email.reset();
      this.isSubmit = false;
    }
  }


  ngOnDestroy() {
    if(this.modalOpen){
      this.modalService.dismissAll();
    }
  }
}
