import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkflowEditorComponent } from '../workflow-editor/workflow-editor.component';
import { StateTypeEnum } from '../state-type.enum';
import _ from 'lodash';
import { dia } from '@joint/core';
import { duplicateNameValidator, nameFormatValidator } from '../utils/validator';

export interface StateDialogResponse {
  name: string;
  stateType: StateTypeEnum;
  data: object;
  accepted: boolean;
}

export interface StateDialogRequest {
  action: 'create' | 'update'
  productName: string;
  states: dia.Element[];
  stateToUpdate?: dia.Element;
}

@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrl: './state-dialog.component.scss',
})
export class StateDialogComponent {
  statesLabels: string[] = [];
  nameControl: FormControl<string>;
  stateTypeControl: FormControl<StateTypeEnum>;
  form: FormGroup;
  stateTypes: string[] = _.uniq(Object.keys(StateTypeEnum));
  data: StateDialogRequest;

  constructor(
    public dialogRef: MatDialogRef<WorkflowEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public request: StateDialogRequest,
  ) {
    this.statesLabels = request.states.map((l) => l.get('name'));
    this.nameControl = new FormControl(request.stateToUpdate?.get('name'), [
      Validators.required,
      Validators.maxLength(256),
      duplicateNameValidator(this.statesLabels, request.stateToUpdate?.get('name')),
      nameFormatValidator(),
    ]);
    this.stateTypeControl = new FormControl<StateTypeEnum>(request.stateToUpdate?.get('stateType'), [
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

  accept(): StateDialogResponse {
    return {
      name: this.nameControl.value,
      accepted: true,
      stateType: this.stateTypeControl.value,
      data: {},
    };
  }

  getErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a message';
    }
    if (this.nameControl.hasError('duplicateName')) {
      return 'Name must not be duplicated';
    }
    if (this.nameControl.hasError('nameFormat')) {
      return 'Name must begin with a lowercase letter and contain only alphanumeric characters';
    }
    return this.nameControl.hasError('minlength') || this.nameControl.hasError('maxlength')
      ? 'The name must not be longer than 256 characters'
      : '';
  }
}
