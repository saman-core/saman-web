import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { DataBaseModule } from '@saman-core/data';
import { AlertModule, AuthModule, AuthService } from '@saman-core/core';
import { InitCdeService } from '@saman-core/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation(),
    ),
    importProvidersFrom(
      SidebarModule,
      DropdownModule,
      BrowserModule,
      NgScrollbarModule,
      DataBaseModule.forRoot(environment.datasourcesFormat),
      AuthModule.forRoot(environment.authConfig),
      AlertModule,
    ),
    IconSetService,
    provideAnimationsAsync(),
    Title,
    provideHttpClient(withInterceptorsFromDi()),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.initConfiguration();
    }),
    provideAppInitializer(() => {
      inject(InitCdeService).initConf();
    }),
  ],
};
