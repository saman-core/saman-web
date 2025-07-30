import { Injectable, inject } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertSubscriptor {
  private _toaster = inject(ToastrService);

  public subject = new Subject<Alert>();

  public getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  public success(message: string): void {
    this._alert(AlertType.SUCCESS, message);
    this._toaster.success(message);
  }

  public error(message: string): void {
    this._alert(AlertType.ERROR, message);
    this._toaster.error(message);
  }

  public info(message: string): void {
    this._alert(AlertType.INFO, message);
    this._toaster.info(message);
  }

  public warn(message: string): void {
    this._alert(AlertType.WARNING, message);
    this._toaster.warning(message);
  }

  private _alert(type: AlertType, message: string): void {
    this.subject.next(new Alert(type, message));
  }
}
