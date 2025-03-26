import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HierarchyEditorComponent } from '../hierarchy-editor/hierarchy-editor.component';
import { dia } from '@joint/core';
import { duplicateNameValidator, nameFormatValidator } from '../utils/validator';
import { EntityTypeEnum } from '../entity-type.enum';

export interface StateDialogResponse {
  name: string;
  comment: string;
  stateType: EntityTypeEnum;
  accepted: boolean;
}

export interface StateDialogRequest {
  action: 'create' | 'update';
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
  stateTypes: EntityTypeEnum[] = Object.values(EntityTypeEnum);
  nameControl: FormControl<string>;
  commentControl: FormControl<string>;
  stateTypeControl: FormControl<EntityTypeEnum>;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<HierarchyEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public request: StateDialogRequest,
  ) {
    const statesLabels = request.states.map((l) => l.get('name'));
    this.nameControl = new FormControl(request.stateToUpdate?.get('name'), [
      Validators.required,
      Validators.maxLength(256),
      duplicateNameValidator(statesLabels, request.stateToUpdate?.get('name')),
      nameFormatValidator(),
    ]);
    this.commentControl = new FormControl(request.stateToUpdate?.get('comment'), [
      Validators.required,
      Validators.maxLength(256),
    ]);
    this.stateTypeControl = new FormControl<EntityTypeEnum>(
      request.stateToUpdate?.get('stateType'),
      [Validators.required],
    );

    this.form = new FormGroup({
      nameControl: this.nameControl,
      commentControl: this.commentControl,
      stateTypeControl: this.stateTypeControl,
    });
  }

  cancel(): void {
    this.dialogRef.close({ message: '', accepted: false });
  }

  accept(): StateDialogResponse {
    return {
      name: this.nameControl.value,
      comment: this.commentControl.value,
      stateType: this.stateTypeControl.value,
      accepted: true,
    };
  }

  getErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.nameControl.hasError('duplicateName')) {
      return 'Name must not be duplicated';
    }
    if (this.nameControl.hasError('nameFormat')) {
      return 'Name must begin with a lowercase letter and contain only alphanumeric characters';
    }
    if (this.nameControl.hasError('minlength') || this.nameControl.hasError('maxlength')) {
      return 'The name must not be longer than 256 characters';
    }
    if (this.commentControl.hasError('required')) {
      return 'You must enter a comment';
    }
    if (this.commentControl.hasError('minlength') || this.commentControl.hasError('maxlength')) {
      return 'The name must not be longer than 256 characters';
    }
    return '';
  }
}
