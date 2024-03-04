import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertSubscriptor } from '@saman-core/core';
import { CommitRequestModel, NodeModel, ResourceRepository } from '@saman-core/data';
import { CdeBuilderComponent } from '@saman-core/common';
import { CommitDialogComponent, CommitDialogResponse } from '../commit-dialog/commit-dialog.component';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-template-form-builder',
  templateUrl: './template-form-builder.component.html',
  styleUrl: './template-form-builder.component.scss',
})
export class TemplateFormBuilderComponent implements OnInit {
  @ViewChild('builder') builder!: CdeBuilderComponent;
  public initialJson: object = { components: [] };
  private _newJson: object = { components: [] };
  @Input() node: NodeModel;
  @Input() productName: string;
  @Input() templateName: string;
  @Output() exitEmitter = new EventEmitter<boolean>();

  constructor(
    private _resourceRepository: ResourceRepository,
    private _alertSubscriptor: AlertSubscriptor,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    try {
      this.initialJson = JSON.parse(Buffer.from(this.node.content, 'base64').toString('utf-8'));
      this._newJson = this.initialJson;
    } catch (_) {
      console.error('initial node content parser error');
    }
  }

  setValue(json: object) {
    this._newJson = json;
  }

  public save(): void {
    this._newJson['properties'] = this.builder.getComponentsKey();
    this.node.content = Buffer.from(JSON.stringify(this._newJson), 'utf-8').toString('base64');

    const dialogRef = this._dialog.open(CommitDialogComponent, {
      data: this.templateName,
    });

    dialogRef.afterClosed().subscribe((response: CommitDialogResponse) => {
      if (response.accepted) {
        const commitRequest: CommitRequestModel = {
          message: response.message,
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
    });
  }

  public exit(): void {
    this.exitEmitter.emit(true);
  }
}
