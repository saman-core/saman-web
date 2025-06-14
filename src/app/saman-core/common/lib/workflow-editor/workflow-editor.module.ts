import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { AlertModule } from '@saman-core/core';
import { ConfigurableDataEntityModule } from '@saman-core/common';
import { WorkflowEditorComponent } from './workflow-editor/workflow-editor.component';
import { StateDialogComponent } from './state-dialog/state-dialog.component';
import { TransitionDialogComponent } from './transition-dialog/transition-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [
    WorkflowEditorComponent,
    StateDialogComponent,
    TransitionDialogComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    ConfigurableDataEntityModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
  ],
  providers: [],
  exports: [WorkflowEditorComponent],
})
export class WorkflowEditorModule {}
