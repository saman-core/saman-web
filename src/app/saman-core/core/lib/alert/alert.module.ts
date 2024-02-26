import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AlertSubscriptor } from './alert.subscriptor';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      tapToDismiss: true,
      preventDuplicates: false,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
      newestOnTop: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 7000,
      extendedTimeOut: 1000,
      disableTimeOut: false,
      easeTime: 300,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [AlertSubscriptor],
})
export class AlertModule {}
