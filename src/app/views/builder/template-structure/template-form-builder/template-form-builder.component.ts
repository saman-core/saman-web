import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertSubscriptor } from '@saman-core/core';
import { CommitRequestModel, NodeModel, ProductsGitRepository } from '@saman-core/data';
import { CdeBuilderComponent } from '@saman-core/common';
import {
  CommitDialogComponent,
  CommitDialogResponse,
} from '../commit-dialog/commit-dialog.component';
import { CdeBuilderComponent as CdeBuilderComponent_1 } from '../../../../saman-core/common/lib/configurable-data-entity/cde-builder/cde-builder.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-template-form-builder',
  templateUrl: './template-form-builder.component.html',
  styleUrl: './template-form-builder.component.scss',
  imports: [CdeBuilderComponent_1, MatButton],
})
export class TemplateFormBuilderComponent implements OnInit {
  private readonly _productsGitRepository = inject(ProductsGitRepository);
  private readonly _alertSubscriptor = inject(AlertSubscriptor);
  private readonly _dialog = inject(MatDialog);

  @ViewChild('builder') builder!: CdeBuilderComponent;
  public initialJson: object = { components: [] };
  private _newJson: object = { components: [] };
  @Input() node: NodeModel;
  @Input() moduleName: string;
  @Input() productName: string;
  @Input() templateName: string;
  @Output() exitEmitter = new EventEmitter<boolean>();

  ngOnInit(): void {
    try {
      this.initialJson = JSON.parse(decodeURIComponent(escape(atob(this.node.content))));
      this._newJson = this.initialJson;
    } catch {
      console.error('initial node content parser error');
    }
  }

  setValue(json: object) {
    this._newJson = json;
  }

  public save(): void {
    this.node.content = btoa(unescape(encodeURIComponent(JSON.stringify(this._newJson))));

    const dialogRef = this._dialog.open(CommitDialogComponent, {
      data: this.templateName,
    });

    dialogRef.afterClosed().subscribe((response: CommitDialogResponse) => {
      if (response.accepted) {
        const commitRequest: CommitRequestModel = {
          message: response.message,
          data: this.node,
        };
        this._productsGitRepository
          .persistTemplate(this.moduleName, this.productName, this.templateName, commitRequest)
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
