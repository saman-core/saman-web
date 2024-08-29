import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ProductWorkflowComponent } from '../product-workflow/product-workflow.component';

export interface CommitDialogResponse {
  message: string;
  accepted: boolean;
}

@Component({
  selector: 'app-commit-workflow-dialog',
  templateUrl: './commit-workflow-dialog.component.html',
  styleUrl: './commit-workflow-dialog.component.scss',
})
export class CommitWorkflowDialogComponent {
  message = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(256),
  ]);
  data: CommitDialogResponse;

  constructor(
    public dialogRef: MatDialogRef<ProductWorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public productName: string,
  ) {}

  cancel(): void {
    this.dialogRef.close({ message: '', accepted: false });
  }

  accept(): CommitDialogResponse {
    return { message: this.message.value, accepted: true };
  }

  getErrorMessage() {
    if (this.message.hasError('required')) {
      return 'You must enter a message';
    }

    return this.message.hasError('minlength') || this.message.hasError('maxlength')
      ? 'The message must be between 8 and 256 characters'
      : '';
  }
}
