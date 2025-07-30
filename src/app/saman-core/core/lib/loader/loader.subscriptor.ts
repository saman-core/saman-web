import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Loader } from './loader.interface';

@Injectable({
  providedIn: 'root',
})
export class LoaderSubscriptor {
  private readonly _loaderSubject = new Subject<Loader>();

  public show(blockScreen: boolean, progressBar: boolean): void {
    const loader: Loader = {
      blockScreenValue: blockScreen,
      progressBarValue: progressBar,
      isReq: true,
    };
    this._loaderSubject.next(loader);
  }

  public hide(blockScreen: boolean, progressBar: boolean): void {
    const loader: Loader = {
      blockScreenValue: blockScreen,
      progressBarValue: progressBar,
      isReq: false,
    };
    this._loaderSubject.next(loader);
  }

  public getObservable(): Observable<Loader> {
    return this._loaderSubject.asObservable();
  }
}
