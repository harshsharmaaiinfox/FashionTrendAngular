import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MobileMenu } from '../../../../../shared/interface/menu.interface';
import { Store } from '@ngxs/store';
import { ToggleSidebarCart } from '../../../../action/cart.action';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
  public active: string = '/';
  public menuItem: MobileMenu[] = [
    {
      id: 1,
      active: true,
      title: 'Home',
      icon: 'ri-home-2',
      path: '/'
    },
    {
      id: 2,
      active: false,
      title: 'Category',
      icon: 'ri-apps-line js',
      path: '/collections'
    },
    {
      id: 3,
      active: false,
      title: 'My Wish',
      icon: 'ri-heart-3',
      path: '/wishlist'
    },
    {
      id: 4,
      active: false,
      title: 'Cart',
      icon: 'fly-cate ri-shopping-bag',
      path: '/cart'
    }
  ]

  constructor(private router: Router, private store: Store){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuItem?.forEach((menu: MobileMenu) => {
          menu.active = false;
          if((event.url.split("?")[0].toString()) === menu.path){
            menu.active = true;
          }
        })
      }
    })
  }

  cartToggle(value: boolean) {
    this.store.dispatch(new ToggleSidebarCart(value));
  }

  activeMenu(menu: string){
    this.active = menu
  }
}
