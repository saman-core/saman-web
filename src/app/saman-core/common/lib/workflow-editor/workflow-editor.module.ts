import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [],
  exports: [WorkflowEditorComponent],
})
export class WorkflowEditorModule {}
