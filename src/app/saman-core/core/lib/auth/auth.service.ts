import { Injectable, inject } from '@angular/core';
import { AuthConfig, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { UserSubscriptor } from '@saman-core/core';
import { AUTH_CONFIG } from './auth.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _oauthService = inject(OAuthService);
  private _userSubscriptor = inject(UserSubscriptor);

  constructor() {
    const _authConfig = inject<AuthConfig>(AUTH_CONFIG);

    this._oauthService.configure(_authConfig);
  }

  public initConfiguration(): Promise<void> {
    return this._oauthService
      .loadDiscoveryDocumentAndLogin()
      .then((onFulfilled) => {
        if (onFulfilled) {
          this._oauthService.loadUserProfile().then(
            (user) => this._userSubscriptor.setUser(user),
            (err) => console.error(err),
          );
          this._oauthService.setupAutomaticSilentRefresh();
        } else {
          this._oauthService.initCodeFlow();
        }
      })
      .catch((err) => {
        const el = document.getElementById('loading-message');
        if (el) {
          el.innerText = 'Error OIDC:\n' + JSON.stringify(err);
          el.style.color = 'red';
        }
        return Promise.reject(err);
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
