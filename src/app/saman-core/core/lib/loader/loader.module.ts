import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressModule } from 'ngx-progressbar';
import { LoaderComponent } from './loader.component';
import { LoaderSubscriptor } from './loader.subscriptor';
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  imports: [
    CommonModule,
    NgProgressModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [LoaderSubscriptor],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
