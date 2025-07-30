import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { WorkflowEditorComponent } from '../workflow-editor/workflow-editor.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

export interface DeleteConfirmationDialogResponse {
  accepted: boolean;
}

export interface DeleteConfirmationDialogRequest {
  typeName: string;
  name: string;
}

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class DeleteConfirmationDialogComponent {
  dialogRef = inject<MatDialogRef<WorkflowEditorComponent>>(MatDialogRef);
  request = inject<DeleteConfirmationDialogRequest>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close({ accepted: false });
  }

  accept(): DeleteConfirmationDialogResponse {
    return { accepted: true };
  }
}
