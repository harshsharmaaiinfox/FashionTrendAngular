import { Injectable, } from '@angular/core';
import { Store } from '@ngxs/store';
import { UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserDetails } from './../../shared/action/account.action';
import { AuthService } from './../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard {

  constructor(private store: Store,
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Store the attempted URL for redirecting after login
    this.authService.redirectUrl = state.url;

    if(this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {

        this.store.dispatch(new GetUserDetails()).subscribe({
            complete: () => {
                return true;
            }
        });

    } else {

        if(this.store.selectSnapshot(state => state.setting).setting.activation.guest_checkout) {

            // Redirect to the login page
            if(this.store.selectSnapshot(state => state.cart.is_digital_only)) {
                return this.router.createUrlTree(['/auth/login']);
            }

        } else {

            return this.router.createUrlTree(['/auth/login']);

        }
        
    }
    
    return true;
  }

}