import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommitRequestModel, NodeModel, ProductsGitRepository } from '@saman-core/data';
import { ActionWorkflowType, WorkflowEditorComponent } from '@saman-core/common';
import {
  CommitWorkflowDialogComponent,
  CommitDialogResponse,
} from '../commit-workflow-dialog/commit-workflow-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertSubscriptor } from '@saman-core/core';

@Component({
  selector: 'app-product-workflow',
  templateUrl: './product-workflow.component.html',
  styleUrl: './product-workflow.component.scss',
})
export class ProductWorkflowComponent {
  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  step = 0;
  products: string[] = [];
  productNameSelected = '';
  node: NodeModel;

  constructor(
    private readonly _productsGitRepository: ProductsGitRepository,
    private readonly _alertSubscriptor: AlertSubscriptor,
    private readonly _dialog: MatDialog,
  ) {
    this.refreshProductTree();
  }

  refreshProductTree() {
    this._productsGitRepository.getAllProductsByModule('po').subscribe((products) => {
      this.products = products.map((p) => p.name);
    });
  }

  openEditor(productName: string) {
    this._productsGitRepository.getWorkflow('po', productName).subscribe((node) => {
      this.dynamicEditorLoader.clear();
      this.node = node;
      const componentRef = this.dynamicEditorLoader.createComponent(WorkflowEditorComponent);
      componentRef.instance.graphJsonBase64 = node.content;
      componentRef.instance.actionEmitter.subscribe((action: ActionWorkflowType) => {
        this.actionsListener(action, componentRef);
      });

      this.productNameSelected = productName;
      this.step = 1;
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  actionsListener(action: ActionWorkflowType, componentRef: ComponentRef<WorkflowEditorComponent>) {
    switch (action.action) {
      case 'save':
        this.save(action.dataBase64);
        break;
      case 'cancel':
        this.node = null;
        this.setStep(0);
        this.productNameSelected = '';
        componentRef.destroy();
        break;
    }
  }

  save(content: string) {
    const dialogRef = this._dialog.open(CommitWorkflowDialogComponent, {
      data: this.productNameSelected,
    });

    dialogRef.afterClosed().subscribe((response: CommitDialogResponse) => {
      if (response.accepted) {
        this.node.content = content;
        const commitRequest: CommitRequestModel = {
          message: response.message,
          data: this.node,
        };
        this._productsGitRepository
          .persistWorkflow('po', this.productNameSelected, commitRequest)
          .subscribe({
            next: (node) => {
              this.node = node;
              this._alertSubscriptor.success('Workflow saved successfully');
            },
            error: (e) => {
              console.error(e);
              this._alertSubscriptor.error('Worklow could not be saved');
            },
          });
      }
    });
  }
}
