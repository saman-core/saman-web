import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TemplateConditionsComponent } from '../template-conditions/template-conditions.component';
import { DmnEditorComponent } from '@saman-core/common';
import {
  CommitDialogComponent,
  CommitDialogRequest,
  CommitDialogResponse,
} from '../commit-dialog/commit-dialog.component';

@Component({
  selector: 'app-template-condition-dialog',
  templateUrl: './template-condition-dialog.component.html',
  styleUrl: './template-condition-dialog.component.scss',
})
export class TemplateConditionDialogComponent {
  @ViewChild('dmneditor') dmnEditor!: DmnEditorComponent;
  data: string;
  dmnName: string;
  namespace: string;
  showFiller = false;
  properties: string[];

  constructor(
    private _dialog: MatDialog,
    public dialogRef: MatDialogRef<TemplateConditionsComponent>,
    @Inject(MAT_DIALOG_DATA) public requestData: ConditionDialogRequest,
  ) {
    this.data = requestData.data;
    this.dmnName = requestData.dmnName;
    this.namespace = requestData.namespace;
    this.properties = requestData.componentsKey;
  }

  cancel(): void {
    this.dialogRef.close({ data: '', accepted: false });
  }

  accept(): void {
    const commitDialogRequest: CommitDialogRequest = {
      templateName: '',
      condition: '',
    };
    const commitDialogRef = this._dialog.open(CommitDialogComponent, {
      data: commitDialogRequest,
    });
    commitDialogRef.afterClosed().subscribe((response: CommitDialogResponse) => {
      if (response.accepted) {
        this.dmnEditor.getContent().subscribe((data) => {
          this.dialogRef.close({ data: data, accepted: true, message: response.message });
        });
      }
    });
  }
}

export interface ConditionDialogRequest {
  data: string;
  dmnName: string;
  namespace: string;
  template: object;
  componentsKey: string[];
}

export interface ConditionDialogResponse {
  data: string;
  message: string;
  accepted: boolean;
}
