import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DmnEditorComponent } from './dmn-editor/dmn-editor.component';
import { DmnAiModule, TemplateBuilderModule } from '@saman-core/data';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertModule } from '@saman-core/core';

@NgModule({
  declarations: [
    DmnEditorComponent
  ],
  imports: [
    CommonModule,
    DmnAiModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    TemplateBuilderModule,
    MatDialogModule,
    AlertModule,
  ],
  providers: [
  ],
  exports: [
    DmnEditorComponent
  ]
})
export class DmnEditorModule {
}
