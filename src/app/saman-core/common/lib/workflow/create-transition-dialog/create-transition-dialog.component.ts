import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { dia } from '@joint/core';
import { WorkflowComponent } from '../workflow/workflow.component';

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

  constructor(
    public dialogRef: MatDialogRef<WorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public request: CreateTransitionDialogRequest,
  ) {
    this.states = request.states;
    this.linksLabels = request.links.map((l) => l.get('name'));
    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
      duplicateLinkNameValidator(this.linksLabels),
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
    if (this.nameControl.hasError('duplicateLinkName')) {
      return 'Name must not be duplicated';
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
}

export function forbiddenTargetStateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null) return null;
    const labelName = control.value.get('name');
    return labelName === 'START' ? { forbiddenTargetState: { value: control.value } } : null;
  };
}

export function duplicateLinkNameValidator(linkLabels: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const found = linkLabels.find((l: string) => l === control.value);
    return typeof found !== 'undefined' ? { duplicateLinkName: { value: control.value } } : null;
  };
}
