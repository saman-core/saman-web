import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CdeEditComponent } from '../cde-edit/cde-edit.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

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
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class EditConfirmDialogComponent {
  dialogRef = inject<MatDialogRef<CdeEditComponent>>(MatDialogRef);
  request = inject<EditConfirmDialogRequest>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close({ accepted: false });
  }

  confirm(): EditConfirmDialogResponse {
    return { accepted: true };
  }
}
