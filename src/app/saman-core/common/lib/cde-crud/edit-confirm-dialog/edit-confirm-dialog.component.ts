import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdeEditComponent } from '../cde-edit/cde-edit.component';

export interface EditConfirmDialogResponse {
  accepted: boolean;
}

export interface EditConfirmDialogRequest {
  name: string;
}

@Component({
    selector: 'app-edit-confirm-dialog',
    templateUrl: './edit-confirm-dialog.component.html',
    styleUrl: './edit-confirm-dialog.component.scss',
    standalone: false
})
export class EditConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CdeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public request: EditConfirmDialogRequest,
  ) {}

  cancel(): void {
    this.dialogRef.close({ accepted: false });
  }

  confirm(): EditConfirmDialogResponse {
    return { accepted: true };
  }
}
