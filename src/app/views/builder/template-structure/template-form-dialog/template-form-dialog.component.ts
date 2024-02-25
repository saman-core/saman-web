import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertSubscriptor } from '@saman-core/core';
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
export class TemplateFormDialogComponent implements OnInit {
  public initialJson: object = { components: [] };
  private _newJson: object = { components: [] };
  @Input() node: NodeModel;
  @Input() productName: string;
  @Input() templateName: string;
  @Output() exitEmitter = new EventEmitter<boolean>();

  constructor(
    private _resourceRepository: ResourceRepository,
    private _alertSubscriptor: AlertSubscriptor,
  ) {}

  ngOnInit(): void {
    try {
      this.initialJson = JSON.parse(atob(this.node.content));
      this._newJson = this.initialJson;
    } catch (_) {
      console.error('initial node content parser error');
    }
  }

  setValue(json: object) {
    this._newJson = json;
  }

  public save(): void {
    this.node.content = btoa(JSON.stringify(this._newJson));
    const commitRequest: CommitRequestModel = {
      message: 'test web2',
      data: this.node,
    };
    this._resourceRepository
      .persistTemplate(this.productName, this.templateName, commitRequest)
      .subscribe({
        next: (node) => {
          this.node = node;
          this._alertSubscriptor.success('Template saved successfully');
        },
        error: (e) => {
          console.error(e);
          this._alertSubscriptor.error('Template could not be saved');
        },
      });
  }

  public exit(): void {
    this.exitEmitter.emit(true);
  }
}
