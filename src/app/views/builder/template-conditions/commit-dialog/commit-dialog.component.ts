import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { TemplateConditionDialogComponent } from '../template-condition-dialog/template-condition-dialog.component';

export interface CommitDialogResponse {
  message: string;
  accepted: boolean;
}

export interface CommitDialogRequest {
  templateName: string;
  condition: string;
}

@Component({
    selector: 'app-commit-dialog',
    templateUrl: './commit-dialog.component.html',
    styleUrl: './commit-dialog.component.scss',
    standalone: false
})
export class CommitDialogComponent {
  message = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(256),
  ]);
  data: CommitDialogResponse;

  constructor(
    public dialogRef: MatDialogRef<TemplateConditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public request: CommitDialogRequest,
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
