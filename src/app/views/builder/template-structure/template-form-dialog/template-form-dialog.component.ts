import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NodeModel, ResourceRepository } from '@saman-core/data';

export interface DialogData {
  node: NodeModel;
}

@Component({
  selector: 'app-template-form-dialog',
  templateUrl: './template-form-dialog.component.html',
  styleUrl: './template-form-dialog.component.scss',
})
export class TemplateFormDialogComponent {
  public formJson = '{}';

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private _resourceRepository: ResourceRepository,
  ) {
    this.formJson = atob(_data.node.content);
  }
}
