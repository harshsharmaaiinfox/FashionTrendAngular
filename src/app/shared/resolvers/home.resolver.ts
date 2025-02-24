import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, Resolve  } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { UpdateProductBox } from "../action/theme-option.action";
import { Observable } from "rxjs";
import { ThemeOptionService } from "../services/theme-option.service";
import { ThemeOptionState } from "../state/theme-option.state";
import { Option } from "../interface/theme-option.interface";


@Injectable({
    providedIn: 'root'
  })
export class HomeResolver implements Resolve<any> {

public theme: string;

@Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

constructor(private store: Store, private themeOptionService: ThemeOptionService) {}

resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.theme = route.queryParams['theme']
    if(this.theme === 'paris' || this.theme === 'tokyo'){
        this.themeOptionService.productBox = 'basic';
      } else if ( this.theme === 'berlin' || this.theme === 'denver'){
        this.themeOptionService.productBox = 'standard';
      } else if (this.theme === 'osaka' || this.theme === 'rome'){
        this.themeOptionService.productBox = 'classic';
      } else if (this.theme === 'cairo'){
        this.themeOptionService.productBox = 'digital';
      } else if (this.theme === 'madrid' || this.theme === 'moscow'){
        this.themeOptionService.productBox = 'premium';
      }  else {
        this.themeOption$.subscribe(theme => {
          this.themeOptionService.productBox = theme?.product ? theme?.product?.product_box_variant : 'basic';
        });
    }
    return this.store.dispatch(new UpdateProductBox(this.themeOptionService.productBox));
  }
}
