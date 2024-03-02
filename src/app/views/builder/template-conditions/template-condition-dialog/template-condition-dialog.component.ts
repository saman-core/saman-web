import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TemplateConditionsComponent } from '../template-conditions/template-conditions.component';

@Component({
  selector: 'app-template-condition-dialog',
  templateUrl: './template-condition-dialog.component.html',
  styleUrl: './template-condition-dialog.component.scss'
})
export class TemplateConditionDialogComponent {
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

  accept(): ConditionDialogResponse {
    return { data: '', accepted: true };
  }
}

export interface ConditionDialogRequest {
  data: string;
}

export interface ConditionDialogResponse {
  data: string;
  accepted: boolean;
}
