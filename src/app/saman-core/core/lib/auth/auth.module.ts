import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { AuthService } from './auth.service';
import { UserSubscriptor } from './user.subscriptor';
import { AUTH_CONFIG } from './auth.config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    AuthService,
    UserSubscriptor,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true,
      },
    ],
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
          ]
      };
  }
}
