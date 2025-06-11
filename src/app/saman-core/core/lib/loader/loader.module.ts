import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressModule } from 'ngx-progressbar';
import { LoaderComponent } from './loader.component';
import { LoaderSubscriptor } from './loader.subscriptor';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    NgProgressModule,
    NgxSpinnerModule,
  ],
  providers: [LoaderSubscriptor],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
