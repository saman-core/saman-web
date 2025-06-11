import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dia } from '@joint/core';
import { HierarchyEditorComponent } from '../hierarchy-editor/hierarchy-editor.component';
import {
  duplicateNameValidator,
  forbiddenTargetStateValidator,
  nameFormatValidator,
} from '../utils/validator';
import { CardinalityTypeEnum } from '../cardinality-type.enum';

export interface TransitionDialogResponse {
  name: string;
  sourceState: dia.Element;
  targetState: dia.Element;
  cardinalitySource: CardinalityTypeEnum;
  cardinalityTarget: CardinalityTypeEnum;
  accepted: boolean;
}

export interface TransitionDialogRequest {
  action: 'Create' | 'Update';
  productName: string;
  states: dia.Element[];
  links: dia.Link[];
  linkToUpdate?: dia.Link;
}

@Component({
    selector: 'app-transition-dialog',
    templateUrl: './transition-dialog.component.html',
    styleUrl: './transition-dialog.component.scss',
    standalone: false
})
export class TransitionDialogComponent {
  states: dia.Element[];
  cardinalitiesOneMany: CardinalityTypeEnum[] = Object.values(CardinalityTypeEnum);
  cardinalitiesOne: CardinalityTypeEnum[] = this.cardinalitiesOneMany.filter((cardinality) =>
    cardinality.startsWith('ONE'),
  );
  linksLabels: string[] = [];
  nameControl: FormControl<string>;
  sourceStateControl: FormControl<dia.Element>;
  targetStateControl: FormControl<dia.Element>;
  cardinalitySourceControl: FormControl<CardinalityTypeEnum>;
  cardinalityTargetControl: FormControl<CardinalityTypeEnum>;
  form: FormGroup;
  data: TransitionDialogRequest;

  constructor(
    public dialogRef: MatDialogRef<HierarchyEditorComponent>,
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
    this.sourceStateControl = new FormControl<dia.Element>(
      request.linkToUpdate?.getSourceElement(),
      [Validators.required],
    );
    this.targetStateControl = new FormControl<dia.Element>(
      request.linkToUpdate?.getTargetElement(),
      [Validators.required, forbiddenTargetStateValidator()],
    );
    this.cardinalitySourceControl = new FormControl<CardinalityTypeEnum>(
      request.linkToUpdate?.get('cardinalitySource'),
      [Validators.required],
    );
    this.cardinalityTargetControl = new FormControl<CardinalityTypeEnum>(
      request.linkToUpdate?.get('cardinalityTarget'),
      [Validators.required],
    );

    this.form = new FormGroup({
      nameControl: this.nameControl,
      sourceStateControl: this.sourceStateControl,
      targetStateControl: this.targetStateControl,
      cardinalitySourceControl: this.cardinalitySourceControl,
      cardinalityTargetControl: this.cardinalityTargetControl,
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
      cardinalitySource: this.cardinalitySourceControl.value,
      cardinalityTarget: this.cardinalityTargetControl.value,
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
}
