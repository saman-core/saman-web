import { Injectable, inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderSubscriptor, AlertSubscriptor, AuthService } from '@saman-core/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _loader = inject(LoaderSubscriptor);
  private _alert = inject(AlertSubscriptor);
  private _authService = inject(AuthService);

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const blockScreen = 'true' === req.headers.get('ignoreBlockScreen');
    const progressBar = 'true' === req.headers.get('ignoreProgressBar');
    const ignoreError = 'true' === req.headers.get('ignoreError');
    const isApi = 'api' === req.headers.get('resourceType');

    if (isApi) {
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

  private sendAlert(err: HttpErrorResponse): void {
    if (err.status === 473) {
      this._alert.info(err.message);
    } else {
      this._alert.error(err.message);
    }
  }
}
