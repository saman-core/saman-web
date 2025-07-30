import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSubscriptor {
  private _user = new BehaviorSubject<object>({ picture: '', username: '' });

  public getObserver(): Observable<object> {
    return this._user.asObservable();
  }

  public setUser(userInfo: object): void {
    this._user.next(userInfo);
  }
}
