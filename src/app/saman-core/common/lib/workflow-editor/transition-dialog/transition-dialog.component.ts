import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { dia } from '@joint/core';
import { WorkflowEditorComponent } from '../workflow-editor/workflow-editor.component';
import { duplicateNameValidator, forbiddenTargetStateValidator, nameFormatValidator } from '../utils/validator';

export interface TransitionDialogResponse {
  name: string;
  sourceState: dia.Element;
  targetState: dia.Element;
  roles: string[];
  data: object;
  accepted: boolean;
}

export interface TransitionDialogRequest {
  action: 'Create' | 'Update'
  productName: string;
  states: dia.Element[];
  links: dia.Link[];
  linkToUpdate?: dia.Link;
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
  rolesControl: FormControl<string>;
  form: FormGroup;
  data: TransitionDialogRequest;
  moduleName = 'tp';
  productName = 'system';
  templateName = 'workflow';
  formValid = false;
  cdeData: object = {};
  roles =   signal<string[]>([]);

  constructor(
    public dialogRef: MatDialogRef<WorkflowEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public request: TransitionDialogRequest,
  ) {
    this.states = request.states;
    this.linksLabels = request.links.map((l) => l.get('name'));
    this.nameControl = new FormControl(request.linkToUpdate?.get('name'), [
      Validators.required,
      Validators.maxLength(256),
      duplicateNameValidator(this.linksLabels, request.linkToUpdate?.get('name')),
      nameFormatValidator(),
    ]);
    this.sourceStateControl = new FormControl<dia.Element>(request.linkToUpdate?.getSourceElement(), [Validators.required]);
    this.targetStateControl = new FormControl<dia.Element>(request.linkToUpdate?.getTargetElement(), [
      Validators.required,
      forbiddenTargetStateValidator(),
    ]);
    this.rolesControl = new FormControl<string>('');
    this.roles.set(request.linkToUpdate?.get('roles') || []);
    this.form = new FormGroup({
      nameControl: this.nameControl,
      sourceStateControl: this.sourceStateControl,
      targetStateControl: this.targetStateControl,
      rolesControl: this.rolesControl,
    });
    if (typeof request.linkToUpdate?.get('data') !== 'undefined')
      this.cdeData = request.linkToUpdate.get('data');
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
      roles: this.roles(),
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

  removeRol(rol: string) {
    this.roles.update(roles => {
      const index = roles.indexOf(rol);
      if (index < 0) {
        return roles;
      }

      roles.splice(index, 1);
      return [...roles];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.roles.update(keywords => [...keywords, value]);
    }
    event.chipInput!.clear();
  }
}
