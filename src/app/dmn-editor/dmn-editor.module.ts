import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmnEditorComponent } from './dmn-editor/dmn-editor.component';

@NgModule({
  declarations: [
    DmnEditorComponent
  ],
  imports: [
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
