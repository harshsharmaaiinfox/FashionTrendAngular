import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';

import { GetHomePage } from '../action/theme.action';

export const ThemeResolver: ResolveFn<boolean> = (route, state) => {
  return inject(Store).dispatch(new GetHomePage(route.paramMap.get('slug') ? route.paramMap.get('slug')! : 'paris'));
};
