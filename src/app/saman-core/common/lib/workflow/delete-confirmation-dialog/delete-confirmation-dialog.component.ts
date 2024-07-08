import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkflowComponent } from '../workflow/workflow.component';

export interface DeleteConfirmationDialogResponse {
  accepted: boolean;
}

export interface DeleteConfirmationDialogRequest {
  typeName: string
  name: string;
}

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<WorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public request: DeleteConfirmationDialogRequest,
  ) {}

  cancel(): void {
    this.dialogRef.close({ accepted: false });
  }

  accept(): DeleteConfirmationDialogResponse {
    return { accepted: true };
  }
}
