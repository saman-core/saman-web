import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthModuleConfig,  } from 'angular-oauth2-oidc';
import { OidcService } from '../oidc.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
  constructor(
      private oidcService: OidcService,
      private moduleConfig: OAuthModuleConfig
  ) {
  }

  private checkUrl(url: string): boolean {
      const found = this.moduleConfig.resourceServer.allowedUrls.find(u => url.startsWith(u));
      return !!found;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      const url = req.url.toLowerCase();

      if (!this.moduleConfig) return next.handle(req);
      if (!this.moduleConfig.resourceServer) return next.handle(req);
      if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(req);
      if (!this.checkUrl(url)) return next.handle(req);

      const sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;
      
      if (sendAccessToken) {

          const token = this.oidcService.getAccessToken();
          const header = 'Bearer ' + token;
          console.log(header);

          const headers = req.headers
                              .set('Authorization', header);

          req = req.clone({ headers });
      }

      return next.handle(req);

  }

}
