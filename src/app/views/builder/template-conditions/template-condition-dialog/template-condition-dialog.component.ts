import { Component, ViewChild, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { TemplateConditionsComponent } from '../template-conditions/template-conditions.component';
import { DmnEditorComponent } from '@saman-core/common';
import {
  CommitDialogComponent,
  CommitDialogRequest,
  CommitDialogResponse,
} from '../commit-dialog/commit-dialog.component';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { DmnEditorComponent as DmnEditorComponent_1 } from '../../../../saman-core/common/lib/dmn-editor/dmn-editor/dmn-editor.component';

@Component({
  selector: 'app-template-condition-dialog',
  templateUrl: './template-condition-dialog.component.html',
  styleUrl: './template-condition-dialog.component.scss',
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatIcon,
    CdkScrollable,
    MatDialogContent,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    DmnEditorComponent_1,
    MatDialogActions,
    MatButton,
  ],
})
export class TemplateConditionDialogComponent {
  private _dialog = inject(MatDialog);
  dialogRef = inject<MatDialogRef<TemplateConditionsComponent>>(MatDialogRef);
  requestData = inject<ConditionDialogRequest>(MAT_DIALOG_DATA);

  @ViewChild('dmneditor') dmnEditor!: DmnEditorComponent;
  data: string;
  dmnName: string;
  namespace: string;
  showFiller = false;
  properties: string[];

  constructor() {
    const requestData = this.requestData;

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
