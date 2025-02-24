import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DownloadState } from '../../../shared/state/download.state';
import { DownloadFiles, DownloadLicense, Downloads } from '../../../shared/action/download.action';
import { DownloadModel } from '../../../shared/interface/download.interface';
import { Params } from '../../../shared/interface/core.interface';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {

  @Select(DownloadState.download) download$: Observable<DownloadModel>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };
  
  public term = new FormControl('');

  constructor(private store: Store) {
    this.store.dispatch(new Downloads(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new Downloads(this.filter));
  }

  search() {
    this.filter['search'] = this.term.value;;
    this.store.dispatch(new Downloads(this.filter));
  }

  downloadFiles(id: number) {
    this.store.dispatch(new DownloadFiles(id));
  }

  downloadLicense(id: number) {
    this.store.dispatch(new DownloadLicense(id));
  }

}
