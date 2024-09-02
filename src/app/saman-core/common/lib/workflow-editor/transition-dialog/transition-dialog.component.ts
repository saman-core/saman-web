import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { dia } from '@joint/core';
import { WorkflowEditorComponent } from '../workflow-editor/workflow-editor.component';
import { duplicateNameValidator, forbiddenTargetStateValidator, nameFormatValidator } from '../utils/validator';

export interface TransitionDialogResponse {
  name: string;
  sourceState: dia.Element;
  targetState: dia.Element;
  data: object;
  accepted: boolean;
}

export interface TransitionDialogRequest {
  action: 'Create' | 'Update'
  productName: string;
  states: dia.Element[];
  links: dia.Link[];
}

@Component({
  selector: 'app-transition-dialog',
  templateUrl: './transition-dialog.component.html',
  styleUrl: './transition-dialog.component.scss',
})
export class TransitionDialogComponent {
  states: dia.Element[];
  linksLabels: string[] = [];
  nameControl: FormControl<string>;
  sourceStateControl: FormControl<dia.Element>;
  targetStateControl: FormControl<dia.Element>;
  form: FormGroup;
  data: TransitionDialogRequest;
  productName = 'system';
  templateName = 'workflow';
  formValid = false;
  cdeData: object = {};

  constructor(
    public dialogRef: MatDialogRef<WorkflowEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public request: TransitionDialogRequest,
  ) {
    this.states = request.states;
    this.linksLabels = request.links.map((l) => l.get('name'));
    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
      duplicateNameValidator(this.linksLabels),
      nameFormatValidator(),
    ]);
    this.sourceStateControl = new FormControl<dia.Element>(null, [Validators.required]);
    this.targetStateControl = new FormControl<dia.Element>(null, [
      Validators.required,
      forbiddenTargetStateValidator(),
    ]);
    this.form = new FormGroup({
      nameControl: this.nameControl,
      sourceStateControl: this.sourceStateControl,
      targetStateControl: this.targetStateControl,
    });
  }

  cancel(): void {
    this.dialogRef.close({ message: '', accepted: false });
  }

  accept(): TransitionDialogResponse {
    return {
      name: this.nameControl.value,
      accepted: true,
      sourceState: this.sourceStateControl.value,
      targetState: this.targetStateControl.value,
      data: this.cdeData,
    };
  }

  nameErrorMessage(): string {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a Name';
    }
    if (this.nameControl.hasError('duplicateName')) {
      return 'Name must not be duplicated';
    }
    if (this.nameControl.hasError('nameFormat')) {
      return 'Name must begin with a lowercase letter and contain only alphanumeric characters';
    }
    return this.nameControl.hasError('minlength') || this.nameControl.hasError('maxlength')
      ? 'Name must not be longer than 256 characters'
      : '';
  }

  sourceStateErrorMessage(): string {
    if (this.sourceStateControl.hasError('required')) {
      return 'You must enter a Source State';
    }
    return '';
  }

  targetStateErrorMessage(): string {
    if (this.targetStateControl.hasError('required')) {
      return 'You must enter a Target State';
    }

    return this.targetStateControl.hasError('forbiddenTargetState')
      ? 'Target State cannot be START'
      : '';
  }

  onChangeData(data: object): void {
    this.cdeData = data;
  }

  onFormErrors(formValid: boolean): void {
    this.formValid = formValid;
  }
}
