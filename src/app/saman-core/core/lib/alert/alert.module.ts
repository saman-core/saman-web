import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
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
})
export class AlertModule {}
