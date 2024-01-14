import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DmnEditorComponent } from './dmn-editor/dmn-editor.component';

@NgModule({
  declarations: [
    DmnEditorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [
  ],
  exports: [
    DmnEditorComponent
  ]
})
export class DmnEditorModule {
}
