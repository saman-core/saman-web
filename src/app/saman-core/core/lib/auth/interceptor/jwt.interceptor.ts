import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { OAuthModuleConfig } from 'angular-oauth2-oidc';
import { LoaderSubscriptor, AlertSubscriptor, AuthService } from '@saman-core/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private _loader: LoaderSubscriptor,
    private _alert: AlertSubscriptor,
    private _moduleConfig: OAuthModuleConfig,
    private _authService: AuthService,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.toLowerCase();

    if (this.sendAuthToken(url)) {
      const token = this._authService.getToken();
      const header = 'Bearer ' + token;
      const headers = req.headers.set('Authorization', header);
      req = req.clone({ headers });
    }
    
    const blockScreen = req.headers.get('ignoreBlockScreen') === 'true';
    const progressBar = req.headers.get('ignoreProgressBar') === 'true';
    const ignoreError = req.headers.get('ignoreerror') === 'true';

    this._loader.show(blockScreen, progressBar);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        if (!ignoreError) {
          this.sendAlert(err);
        }
        return throwError(() => err);
      }),
      finalize(() => {
        this._loader.hide(blockScreen, progressBar);
      })
    );
  }

  private sendAuthToken(url: string): boolean {
    if (!this._moduleConfig) return true;
    if (!this._moduleConfig.resourceServer) return true;
    if (!this._moduleConfig.resourceServer.allowedUrls) return true;
    if (this.checkUrl(url)) return true;
    return false;
  }

  private checkUrl(url: string): boolean {
    const found = this._moduleConfig.resourceServer.allowedUrls.find((u) => url.startsWith(u));
    return !!found;
  }

  private sendAlert(err: HttpErrorResponse): void {
    if (err.status === 473) {
      this._alert.info(err.message);
    } else {
      this._alert.error(err.message);
    }
  }
}
