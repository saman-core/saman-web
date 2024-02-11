import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { AuthService } from './auth.service';
import { UserSubscriptor } from './user.subscriptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8080'],
        sendAccessToken: true,
      },
    }),
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
export class AuthModule {}
