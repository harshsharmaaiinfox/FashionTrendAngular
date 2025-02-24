import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { tap } from "rxjs";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { Product } from "../interface/product.interface";
import { AddToWishlist, DeleteWishlist, GetWishlist } from "../action/wishlist.action";
import { WishlistService } from "../services/wishlist.service";
import { NotificationService } from "../services/notification.service";

export class WishlistStateModel {
  wishlist = {
    data: [] as Product[],
    total: 0
  }
  wishlistIds: number[]
}

@State<WishlistStateModel>({
  name: "wishlist",
  defaults: {
    wishlist: {
      data: [],
      total: 0
    },
    wishlistIds: []
  },
})

@Injectable()
export class WishlistState {

  constructor(private store: Store, public router: Router,
    private wishlistService: WishlistService,
    private notificationService: NotificationService){}

  @Selector()
  static wishlistItems(state: WishlistStateModel) {
    return state.wishlist;
  }

  @Selector()
  static wishlistIds(state: WishlistStateModel) {
    return state.wishlistIds;
  }

  @Action(GetWishlist)
  getWishlistItems(ctx: StateContext<GetWishlist>) {
    if(!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      return;
    }
    this.wishlistService.skeletonLoader = true;
    return this.wishlistService.getWishlistItems().pipe(
      tap({
        next: result => {
          let ids = result.data.map(product => product.id)
          ctx.patchState({
            wishlist: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            },
            wishlistIds: ids
          });
        },
        complete: () => {
          this.wishlistService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(AddToWishlist)
  add(ctx: StateContext<WishlistStateModel>, action: AddToWishlist){
    if(!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      localStorage.setItem('wishlist', action.payload['product_id'])
      this.router.navigate(['/auth/login']);
      return;
    }
    return this.wishlistService.addToWishlist(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          let ids = [...state.wishlistIds, action.payload['product_id'] ]
          ctx.patchState({
            ...state,
            wishlist: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            },
            wishlistIds: ids
          });
        },
        complete:() => {
          if(!localStorage.getItem('wishlist')){
            this.notificationService.showSuccess('Added To Wishlist Successfully.');
          } else {
            localStorage.setItem('wishlist', '')
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteWishlist)
  delete(ctx: StateContext<WishlistStateModel>, { id }: DeleteWishlist) {
    return this.wishlistService.deleteWishlist(id).pipe(
      tap({
        next: () => {
          const state = ctx.getState();
          let item = state.wishlist?.data?.filter(value => value.id !== id);
          let ids = state.wishlistIds?.filter(ids => ids !== id);
          
          ctx.patchState({
            ...state,
            wishlist: {
              data: item,
              total: state.wishlist.total - 1
            },
            wishlistIds: ids
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }
}
