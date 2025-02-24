import { Injectable, } from '@angular/core';
import { Store } from '@ngxs/store';
import { UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserDetails } from './../../shared/action/account.action';
import { AuthService } from './../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private store: Store,
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Store the attempted URL for redirecting after login
    this.authService.redirectUrl = state.url;

    // Redirect to the login page
    if(!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      return this.router.createUrlTree(['/auth/login']);
    }

    this.store.dispatch(new GetUserDetails()).subscribe({
      complete: () => {
        return true;
      }
    });
    
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (!!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      if(this.router.url.startsWith('/account') || this.router.url == '/checkout' || this.router.url == '/compare')
        this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}