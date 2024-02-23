import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommitRequestModel, NodeModel, ResourceRepository } from '@saman-core/data';

export interface DialogData {
  productName: string;
  templateName: string;
  node: NodeModel;
}

@Component({
  selector: 'app-template-form-dialog',
  templateUrl: './template-form-dialog.component.html',
  styleUrl: './template-form-dialog.component.scss',
})
export class TemplateFormDialogComponent {
  public formJson = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private _resourceRepository: ResourceRepository,
  ) {
    this.formJson = JSON.parse(atob(this._data.node.content));
  }

  public save(): void {
    this._data.node.content = btoa(JSON.stringify(this.formJson));
    const commitRequest: CommitRequestModel = {
      message: 'test web',
      data: this._data.node,
    };
    this._resourceRepository
      .persistTemplate(this._data.productName, this._data.templateName, commitRequest)
      .subscribe(() => {
        alert('ok');
      });
  }
}
