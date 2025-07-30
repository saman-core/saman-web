import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { AUTH_CONFIG } from './auth.config';

@NgModule({
  imports: [OAuthModule.forRoot()],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true,
      },
    ],
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
