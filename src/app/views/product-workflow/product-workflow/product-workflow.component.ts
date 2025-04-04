import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import {
  CommitRequestModel,
  DynamicFlatNode,
  NodeModel,
  ProductsGitRepository,
} from '@saman-core/data';
import { ActionWorkflowType, WorkflowEditorComponent } from '@saman-core/common';
import {
  CommitWorkflowDialogComponent,
  CommitDialogResponse,
} from '../commit-workflow-dialog/commit-workflow-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertSubscriptor } from '@saman-core/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DynamicDataSource } from './dynamic-data-source';

@Component({
  selector: 'app-product-workflow',
  templateUrl: './product-workflow.component.html',
  styleUrl: './product-workflow.component.scss',
})
export class ProductWorkflowComponent {
  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  step = 0;
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  moduleNameSelected = '';
  productNameSelected = '';
  node: NodeModel;

  constructor(
    private readonly _productsGitRepository: ProductsGitRepository,
    private readonly _alertSubscriptor: AlertSubscriptor,
    private readonly _dialog: MatDialog,
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, _productsGitRepository);

    this.refreshModuleTree();
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  refreshModuleTree() {
    this._productsGitRepository.getAllModules().subscribe((products) => {
      this.dataSource.data = products.map((p) => new DynamicFlatNode(p.name, 0, '', '', true));
    });
  }

  openEditor(moduleName: string, productName: string) {
    this._productsGitRepository.getWorkflow(moduleName, productName).subscribe((node) => {
      this.dynamicEditorLoader.clear();
      this.node = node;
      const componentRef = this.dynamicEditorLoader.createComponent(WorkflowEditorComponent);
      componentRef.instance.graphJsonBase64 = node.content;
      componentRef.instance.actionEmitter.subscribe((action: ActionWorkflowType) => {
        this.actionsListener(action, componentRef);
      });

      this.moduleNameSelected = moduleName;
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
        this.moduleNameSelected = '';
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
          .persistWorkflow(this.moduleNameSelected, this.productNameSelected, commitRequest)
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
