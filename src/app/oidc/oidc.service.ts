import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './config';
import { Router } from '@angular/router';

@Injectable()
export class OidcService {

  constructor(private oauthService: OAuthService, private router: Router) { }

  initConfiguration(): void {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.router.navigate(['/']);
    });
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  logOut(): void {
    this.oauthService.logOut();
  }
}
