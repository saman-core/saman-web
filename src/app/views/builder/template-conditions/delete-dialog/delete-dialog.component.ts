import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateConditionsComponent } from '../template-conditions/template-conditions.component';
import { ConditionTypeEnum } from '@saman-core/data';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatInput, MatError } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatError,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class DeleteDialogComponent {
  dialogRef = inject<MatDialogRef<TemplateConditionsComponent>>(MatDialogRef);
  requestData = inject<DeleteDialogRequest>(MAT_DIALOG_DATA);

  message = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(256),
  ]);
  data: DeleteDialogResponse;

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
