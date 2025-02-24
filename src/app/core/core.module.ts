import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

// Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

// Global Error
import { GlobalErrorHandler } from './error/global-error-handler';
import { AuthState } from '../shared/state/auth.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([AuthState])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { 
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: LoaderInterceptor, 
      multi: true 
    },
  ],
})
export class CoreModule { }
