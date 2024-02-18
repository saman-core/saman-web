import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmnEditorComponent } from './dmn-editor/dmn-editor.component';
import { TemplateBuilderModule } from '@saman-core/data';

@NgModule({
  declarations: [
    DmnEditorComponent
  ],
  imports: [
    CommonModule,
    TemplateBuilderModule
  ],
  providers: [
  ],
  exports: [
    DmnEditorComponent
  ]
})
export class DmnEditorModule {
}
