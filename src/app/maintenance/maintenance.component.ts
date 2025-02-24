import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { SettingState } from '../shared/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../shared/interface/setting.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;

  constructor(private router: Router){
    this.setting$.subscribe(setting => {
      let isMaintenanceModeOn = setting?.maintenance?.maintenance_mode!
      if(!isMaintenanceModeOn){
        this.router.navigate(['/'])
      }
    })
  }

}
