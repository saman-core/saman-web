import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { WorkflowComponent } from '../workflow/workflow.component';
import { StateTypeEnum } from '../state-type.enum';
import _ from 'lodash';
import { dia } from '@joint/core';

export interface CreateStateDialogResponse {
  name: string;
  stateType: StateTypeEnum,
  accepted: boolean;
}

export interface CreateStateDialogRequest {
  productName: string;
  states: dia.Element[];
}

@Component({
  selector: 'app-create-state-dialog',
  templateUrl: './create-state-dialog.component.html',
  styleUrl: './create-state-dialog.component.scss',
})
export class CreateStateDialogComponent {
  statesLabels: string[] = [];
  nameControl: FormControl<string>;
  stateTypeControl: FormControl<StateTypeEnum>;
  form: FormGroup;
  stateTypes: string[] = _.uniq(Object.keys(StateTypeEnum));
  data: CreateStateDialogRequest;

  constructor(
    public dialogRef: MatDialogRef<WorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public request: CreateStateDialogRequest,
  ) {
    this.statesLabels = request.states.map((l) => l.get('name'));
    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
      duplicateStateNameValidator(this.statesLabels),
    ]);
    this.stateTypeControl = new FormControl<StateTypeEnum>(StateTypeEnum.PENDING, [
      Validators.required,
    ]);
    this.form = new FormGroup({
      nameControl: this.nameControl,
      stateTypeControl: this.stateTypeControl,
    });
  }

  cancel(): void {
    this.dialogRef.close({ message: '', accepted: false });
  }

  accept(): CreateStateDialogResponse {
    return { name: this.nameControl.value, accepted: true, stateType: this.stateTypeControl.value };
  }

  getErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a message';
    }
    if (this.nameControl.hasError('duplicateLinkName')) {
      return 'Name must not be duplicated';
    }
    return this.nameControl.hasError('minlength') || this.nameControl.hasError('maxlength')
      ? 'The name must not be longer than 256 characters'
      : '';
  }
}

export function duplicateStateNameValidator(linkLabels: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const found = linkLabels.find((l: string) => l === control.value);
    return typeof found !== 'undefined' ? { duplicateLinkName: { value: control.value } } : null;
  };
}
