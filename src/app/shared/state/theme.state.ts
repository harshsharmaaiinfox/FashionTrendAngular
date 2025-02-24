import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { ThemeService } from "../services/theme.service";
import { GetHomePage, GetThemes } from "../action/theme.action";

export class ThemesStateModel {
  homePage: object | null;
  activeTheme: string;
}

@State<ThemesStateModel>({
  name: "theme",
  defaults: {
    homePage: null,
    activeTheme: ''
  },
})
@Injectable()
export class ThemeState {

  constructor(private themeService: ThemeService) {}

  @Selector()
  static homePage(state: ThemesStateModel) {
    return state.homePage;
  }

  @Selector()
  static activeTheme(state: ThemesStateModel) {
    return state.activeTheme;
  }

  @Action(GetThemes)
  getThemes(ctx: StateContext<ThemesStateModel>) {
    return this.themeService.getThemes().pipe(
      tap({
        next: (result) => {
          var activeTheme: string = '';
          result.data.map(theme => {
            // if(theme.status === 1) { activeTheme = theme.slug} // Force Update
            if(theme.id === 5) { activeTheme = theme.slug}
          })
          ctx.patchState({
            homePage: result,
            activeTheme: activeTheme
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetHomePage)
  getHomePage(ctx: StateContext<ThemesStateModel>, action: GetHomePage) {
    // this.themeOptionService.preloader = true;
    return this.themeService.getHomePage(action?.slug).pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            homePage: result
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
        // complete: () =>{
        //   this.themeOptionService.preloader = false;
        // }
      })
    );
  }

}
