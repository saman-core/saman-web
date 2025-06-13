import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgProgressbar } from 'ngx-progressbar';
import { LoaderComponent } from './loader.component';
import { LoaderSubscriptor } from './loader.subscriptor';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgProgressbar,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [LoaderSubscriptor],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
