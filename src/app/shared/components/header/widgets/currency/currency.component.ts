import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Currency, CurrencyModel } from '../../../../../shared/interface/currency.interface';
import { CurrencyState } from '../../../../../shared/state/currency.state';
import { SettingState } from '../../../../../shared/state/setting.state';
import { Values } from '../../../../../shared/interface/setting.interface';
import { SelectedCurrency } from '../../../../../shared/action/setting.action';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(SettingState.selectedCurrency) selectedCurrency$: Observable<Currency>;

  public open: boolean = false;
  public selectedCurrency: Currency;
  public setting: Values;

  @Input() style: string = 'basic';

  @Select(CurrencyState.currency) currency$: Observable<CurrencyModel>;

  constructor( private store: Store) {
    this.selectedCurrency$.subscribe(setting => this.selectedCurrency = setting);
  }

  openDropDown(){
    this.open = !this.open;
  }

  selectCurrency(currency: Currency){
    this.selectedCurrency = currency;
    this.open = false;
    this.store.dispatch(new SelectedCurrency(currency)).subscribe({
      complete: () => {
        window.location.reload();
      }
    });
  }

  hideDropdown(){
    this.open = false;
  }
}
