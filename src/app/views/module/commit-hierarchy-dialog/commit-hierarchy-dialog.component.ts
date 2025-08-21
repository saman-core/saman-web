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
import { ModuleHierarchyComponent } from '../module-hierarchy/module-hierarchy.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatInput, MatError } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

export interface CommitDialogResponse {
  message: string;
  accepted: boolean;
}

@Component({
  selector: 'app-commit-hierarchy-dialog',
  templateUrl: './commit-hierarchy-dialog.component.html',
  styleUrl: './commit-hierarchy-dialog.component.scss',
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
export class CommitHierarchyDialogComponent {
  dialogRef = inject<MatDialogRef<ModuleHierarchyComponent>>(MatDialogRef);
  productName = inject(MAT_DIALOG_DATA);

  message = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(256),
  ]);
  data: CommitDialogResponse;

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
