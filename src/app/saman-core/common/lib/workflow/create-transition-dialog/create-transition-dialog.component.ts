import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { dia } from '@joint/core';
import { WorkflowComponent } from '../workflow/workflow.component';
import { duplicateNameValidator, forbiddenTargetStateValidator, nameFormatValidator } from '../utils/validator';

export interface CreateTransitionDialogResponse {
  name: string;
  sourceState: dia.Element;
  targetState: dia.Element;
  accepted: boolean;
}

export interface CreateTransitionDialogRequest {
  productName: string;
  states: dia.Element[];
  links: dia.Link[];
}

@Component({
  selector: 'app-create-transition-dialog',
  templateUrl: './create-transition-dialog.component.html',
  styleUrl: './create-transition-dialog.component.scss',
})
export class CreateTransitionDialogComponent {
  states: dia.Element[];
  linksLabels: string[] = [];
  nameControl: FormControl<string>;
  sourceStateControl: FormControl<dia.Element>;
  targetStateControl: FormControl<dia.Element>;
  form: FormGroup;
  data: CreateTransitionDialogRequest;
  productName = 'common';
  templateName = 'workflow';
  formValid = false;
  cdeData: object = {};

  constructor(
    public dialogRef: MatDialogRef<WorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public request: CreateTransitionDialogRequest,
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

  accept(): CreateTransitionDialogResponse {
    return {
      name: this.nameControl.value,
      accepted: true,
      sourceState: this.sourceStateControl.value,
      targetState: this.targetStateControl.value,
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
