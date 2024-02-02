import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './config';

@Injectable({
  providedIn: 'root'
})
export class OidcService {

  constructor(private oauthService: OAuthService) { }

  initConfiguration(): void {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocument();
  }

  initCodeFlow(): void {
    this.oauthService.initCodeFlow();
  }

  logOut(): void {
    this.oauthService.logOut();
  }
}
