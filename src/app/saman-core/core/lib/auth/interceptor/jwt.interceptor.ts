import { Inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthConfig } from 'angular-oauth2-oidc';
import { LoaderSubscriptor, AlertSubscriptor, AuthService } from '@saman-core/core';
import { AUTH_CONFIG } from '../auth.config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _oidcIssuer: string;

  constructor(
    @Inject(AUTH_CONFIG) _authConfig: AuthConfig,
    private _loader: LoaderSubscriptor,
    private _alert: AlertSubscriptor,
    private _authService: AuthService,
  ) {
    this._oidcIssuer = _authConfig.issuer;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const blockScreen = 'true' === req.headers.get('ignoreBlockScreen');
    const progressBar = 'true' === req.headers.get('ignoreProgressBar');
    const ignoreError = 'true' === req.headers.get('ignoreError');

    const url = req.url.toLowerCase();
    if (this.sendAuthToken(url)) {
      console.log('send T:' + url);
      const token = this._authService.getToken();
      const header = 'Bearer ' + token;
      const headers = req.headers.set('Authorization', header);
      req = req.clone({ headers });
    }

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
      }),
    );
  }

  private sendAuthToken(url: string): boolean {
    if (!this._oidcIssuer) return false;
    if (url.startsWith('http://localhost:8080')) return true;
    return false;
  }

  private sendAlert(err: HttpErrorResponse): void {
    if (err.status === 473) {
      this._alert.info(err.message);
    } else {
      this._alert.error(err.message);
    }
  }
}
