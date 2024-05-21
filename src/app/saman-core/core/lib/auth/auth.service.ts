import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { UserSubscriptor } from '@saman-core/core';
import { AUTH_CONFIG } from './auth.config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_CONFIG) _authConfig: AuthConfig,
    private _oauthService: OAuthService,
    private _userSubscriptor: UserSubscriptor,
    private _router: Router,
  ) {
    this._oauthService.configure(_authConfig);
  }

  public initConfiguration(): void {
    this._oauthService.loadDiscoveryDocumentAndLogin().then((onFulfilled) => {
      if (onFulfilled) {
        this._oauthService.loadUserProfile().then(
          (user) => this._userSubscriptor.setUser(user),
          (err) => console.error(err),
        );
        this._oauthService.setupAutomaticSilentRefresh();
        this._router.navigate(['/']);
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

  public events(): Observable<OAuthEvent> {
    return this._oauthService.events;
  }

  public logout(): void {
    this._userSubscriptor.setUser({});
    this._oauthService.logOut();
  }
}
