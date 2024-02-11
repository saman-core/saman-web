import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserSubscriptor } from '@saman-core/core/lib/auth/user.subscriptor';
import { authConfig } from './config';

@Injectable()
export class AuthService {
  
  constructor(
    private _oauthService: OAuthService,
    private _userSubscriptor: UserSubscriptor,
    private router: Router
  ) {
  }

  public initConfiguration(): void {
    this._oauthService.configure(authConfig);

    this._oauthService.loadDiscoveryDocumentAndLogin().then((onFulfilled) => {
      if (onFulfilled) {
        this._oauthService.loadUserProfile().then(
          (user) => this._userSubscriptor.setUser(user),
          (err) => console.error(err)
        );
        this._oauthService.setupAutomaticSilentRefresh();
        this.router.navigate(['/']);
      } else {
        this._oauthService.initCodeFlow();
      }
    });
  }

  public hasValidAccessToken(): boolean {
    return this._oauthService.hasValidAccessToken();
  }

  public getToken(): string {
    return this._oauthService.getAccessToken();
  }

  public logout(): void {
    this._userSubscriptor.setUser({});
    this._oauthService.logOut();
  }
}
