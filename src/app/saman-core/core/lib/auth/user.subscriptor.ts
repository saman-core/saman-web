import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserSubscriptor {
  private _user = new Subject<object>();

  public getObserver(): Observable<object> {
    return this._user.asObservable();
  }

  public setUser(userInfo: object): void {
    this._user.next(userInfo);
  }
}
