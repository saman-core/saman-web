import { 
  Component,
  ViewChild,
  TemplateRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoaderSubscriptor } from './loader.subscriptor';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { Loader } from './loader.interface';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
})
export class LoaderComponent implements OnInit, OnDestroy {
  @ViewChild('emptyLoadingTemplate', { static: false })
  emptyLoadingTemplate!: TemplateRef<Element>;
  
  progressRef: NgProgressRef;
  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  loading = false;

  private _attemptsProgressBar = 0;
  private _attemptsLoading = 0;
  private _unsubscribe = new Subject<boolean>();

  constructor(
    private _loaderSubscriptor: LoaderSubscriptor,
    private progress: NgProgress
  ) {}

  ngOnInit(): void {
    this.progressRef = this.progress.ref('progress-bar');
    this._loaderSubscriptor
      .getObservable()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((loader: Loader) => {
        this.updateAttempts(loader);
        
        if (this._attemptsLoading > 0.1) {
          this.loading = true;
        } else {
          this.loading = false;
        }
        
        if (this._attemptsProgressBar > 0.1) {
          this.progressRef.start();
        } else {
          this.progressRef.complete();
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
