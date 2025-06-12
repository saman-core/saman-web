import {
  Component,
  OnDestroy,
  OnInit,
  Signal,
  viewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoaderSubscriptor } from './loader.subscriptor';
import { Loader } from './loader.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgProgressRef } from 'ngx-progressbar';

@Component({
    selector: 'app-loader',
    templateUrl: 'loader.component.html',
    standalone: false
})
export class LoaderComponent implements OnInit, OnDestroy {
  progressBar: Signal<NgProgressRef> = viewChild(NgProgressRef);
  private _attemptsProgressBar = 0;
  private _attemptsLoading = 0;
  private readonly _unsubscribe = new Subject<boolean>();

  constructor(
    private readonly _loaderSubscriptor: LoaderSubscriptor,
    private readonly spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this._loaderSubscriptor
      .getObservable()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((loader: Loader) => {
        this.updateAttempts(loader);

        if (this._attemptsLoading > 0.1) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }

        if (this._attemptsProgressBar > 0.1) {
          this.progressBar().start();
        } else {
          this.progressBar().complete();
        }
      });
  }

  private updateAttempts(loader: Loader): void {
    if (loader.isReq) {
      if (loader.blockScreenValue) this._attemptsLoading++;
      if (loader.progressBarValue) this._attemptsProgressBar++;
    } else {
      if (loader.blockScreenValue) this._attemptsLoading--;
      if (loader.progressBarValue) this._attemptsProgressBar--;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
