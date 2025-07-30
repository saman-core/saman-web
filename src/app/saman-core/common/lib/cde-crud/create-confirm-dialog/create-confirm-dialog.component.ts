import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CdeCreateComponent } from '../cde-create/cde-create.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

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
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class CreateConfirmDialogComponent {
  dialogRef = inject<MatDialogRef<CdeCreateComponent>>(MatDialogRef);
  request = inject<CreateConfirmDialogRequest>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close({ accepted: false });
  }

  confirm(): CreateConfirmDialogResponse {
    return { accepted: true };
  }
}
