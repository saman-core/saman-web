import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdeCreateComponent } from '../cde-create/cde-create.component';

export interface CreateConfirmDialogResponse {
  accepted: boolean;
}

export interface CreateConfirmDialogRequest {
  name: string;
}

@Component({
    selector: 'app-create-confirm-dialog',
    templateUrl: './create-confirm-dialog.component.html',
    styleUrl: './create-confirm-dialog.component.scss',
    standalone: false
})
export class CreateConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CdeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public request: CreateConfirmDialogRequest,
  ) {}

  cancel(): void {
    this.dialogRef.close({ accepted: false });
  }

  confirm(): CreateConfirmDialogResponse {
    return { accepted: true };
  }
}
