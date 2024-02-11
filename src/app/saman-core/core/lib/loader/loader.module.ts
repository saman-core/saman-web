import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { LoaderComponent } from './loader.component';
import { LoaderSubscriptor } from './loader.subscriptor';
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  imports: [
    CommonModule,
    NgProgressModule,
    NgProgressRouterModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [LoaderSubscriptor],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
