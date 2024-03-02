import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { TemplateConditionsComponent } from '../template-conditions/template-conditions.component';
import { ConditionTypeEnum } from '@saman-core/data/lib/module/template-builder/model/condition-type.enum';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  message = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(256),
  ]);
  data: DeleteDialogResponse;

  constructor(
    public dialogRef: MatDialogRef<TemplateConditionsComponent>,
    @Inject(MAT_DIALOG_DATA) public requestData: DeleteDialogRequest,
  ) {}

  cancel(): void {
    this.dialogRef.close({ message: '', accepted: false });
  }

  accept(): DeleteDialogResponse {
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

export interface DeleteDialogRequest {
  conditionType: ConditionTypeEnum;
  templateName: string;
}

export interface DeleteDialogResponse {
  message: string;
  accepted: boolean;
}
