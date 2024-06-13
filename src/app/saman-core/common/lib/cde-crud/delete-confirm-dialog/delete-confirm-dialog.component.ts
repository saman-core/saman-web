import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdeCrudComponent } from '../cde-crud/cde-crud.component';

export interface DeleteConfirmDialogResponse {
  accepted: boolean;
}

export interface DeleteConfirmDialogRequest {
  name: string;
}

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss',
})
export class DeleteConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CdeCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public request: DeleteConfirmDialogRequest,
  ) {}

  cancel(): void {
    this.dialogRef.close({ accepted: false });
  }

  confirm(): DeleteConfirmDialogResponse {
    return { accepted: true };
  }
}
