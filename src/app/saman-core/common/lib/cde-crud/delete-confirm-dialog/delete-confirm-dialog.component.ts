import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CdeCrudComponent } from '../cde-crud/cde-crud.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

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
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class DeleteConfirmDialogComponent {
  dialogRef = inject<MatDialogRef<CdeCrudComponent>>(MatDialogRef);
  request = inject<DeleteConfirmDialogRequest>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close({ accepted: false });
  }

  confirm(): DeleteConfirmDialogResponse {
    return { accepted: true };
  }
}
