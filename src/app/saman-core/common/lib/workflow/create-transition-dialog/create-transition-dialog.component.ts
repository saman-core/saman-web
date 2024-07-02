import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { WorkflowComponent } from '../workflow/workflow.component';
import { StateTypeEnum } from '../state-type.enum';
import _ from 'lodash';

export interface CreateTransitionDialogResponse {
  name: string;
  stateType: StateTypeEnum,
  accepted: boolean;
}

export interface CreateTransitionDialogRequest {
  productName: string;
}

@Component({
  selector: 'app-create-transition-dialog',
  templateUrl: './create-transition-dialog.component.html',
  styleUrl: './create-transition-dialog.component.scss',
})
export class CreateTransitionDialogComponent {
  nameControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(256),
  ]);
  stateTypeControl = new FormControl<StateTypeEnum>(StateTypeEnum.PENDING, [
    Validators.required,
  ]);
  stateTypes: string[] = _.uniq(Object.keys(StateTypeEnum));
  data: CreateTransitionDialogRequest;

  constructor(
    public dialogRef: MatDialogRef<WorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public request: CreateTransitionDialogRequest,
  ) {}

  cancel(): void {
    this.dialogRef.close({ message: '', accepted: false });
  }

  accept(): CreateTransitionDialogResponse {
    return { name: this.nameControl.value, accepted: true, stateType: this.stateTypeControl.value };
  }

  getErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a message';
    }

    return this.nameControl.hasError('minlength') || this.nameControl.hasError('maxlength')
      ? 'The name must not be longer than 256 characters'
      : '';
  }
}
