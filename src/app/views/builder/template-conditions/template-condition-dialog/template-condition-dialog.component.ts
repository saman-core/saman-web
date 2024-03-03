import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TemplateConditionsComponent } from '../template-conditions/template-conditions.component';
import { DmnEditorComponent } from '@saman-core/common';

@Component({
  selector: 'app-template-condition-dialog',
  templateUrl: './template-condition-dialog.component.html',
  styleUrl: './template-condition-dialog.component.scss'
})
export class TemplateConditionDialogComponent {
  @ViewChild('dmneditor') dmnEditor!: DmnEditorComponent;
  data = '';

  constructor(
    public dialogRef: MatDialogRef<TemplateConditionsComponent>,
    @Inject(MAT_DIALOG_DATA) public requestData: ConditionDialogRequest,
  ) {
    this.data =  requestData.data;
  }

  cancel(): void {
    this.dialogRef.close({ data: '', accepted: false });
  }

  accept(): void {
    this.dmnEditor.getContent().subscribe(data => {
      this.dialogRef.close({ data: data, accepted: true });
    });
  }
}

export interface ConditionDialogRequest {
  data: string;
}

export interface ConditionDialogResponse {
  data: string;
  message: string;
  accepted: boolean;
}
