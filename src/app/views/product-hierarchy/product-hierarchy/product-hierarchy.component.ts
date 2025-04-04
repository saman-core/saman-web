import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommitRequestModel, NodeModel, ProductsGitRepository } from '@saman-core/data';
import { ActionHierarchyType, HierarchyEditorComponent } from '@saman-core/common';
import {
  CommitHierarchyDialogComponent,
  CommitDialogResponse,
} from '../commit-hierarchy-dialog/commit-hierarchy-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertSubscriptor } from '@saman-core/core';

@Component({
  selector: 'app-product-hierarchy',
  templateUrl: './product-hierarchy.component.html',
  styleUrl: './product-hierarchy.component.scss',
})
export class ProductHierarchyComponent {
  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  step = 0;
  modules: string[] = [];
  moduleNameSelected = '';
  node: NodeModel;

  constructor(
    private readonly _productsGitRepository: ProductsGitRepository,
    private readonly _alertSubscriptor: AlertSubscriptor,
    private readonly _dialog: MatDialog,
  ) {
    this.refreshProductTree();
  }

  refreshProductTree() {
    this._productsGitRepository.getAllModules().subscribe((products) => {
      this.modules = products.map((p) => p.name);
    });
  }

  openEditor(moduleName: string) {
    this._productsGitRepository.getEr(moduleName).subscribe((node) => {
      this.dynamicEditorLoader.clear();
      this.node = node;
      const componentRef = this.dynamicEditorLoader.createComponent(HierarchyEditorComponent);
      componentRef.instance.graphJsonBase64 = node.content;
      componentRef.instance.actionEmitter.subscribe((action: ActionHierarchyType) => {
        this.actionsListener(action, componentRef);
      });

      this.moduleNameSelected = moduleName;
      this.step = 1;
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  actionsListener(
    action: ActionHierarchyType,
    componentRef: ComponentRef<HierarchyEditorComponent>,
  ) {
    switch (action.action) {
      case 'save':
        this.save(action.dataBase64);
        break;
      case 'cancel':
        this.node = null;
        this.setStep(0);
        this.moduleNameSelected = '';
        componentRef.destroy();
        break;
    }
  }

  save(content: string) {
    const dialogRef = this._dialog.open(CommitHierarchyDialogComponent, {
      data: this.moduleNameSelected,
    });

    dialogRef.afterClosed().subscribe((response: CommitDialogResponse) => {
      if (response.accepted) {
        this.node.content = content;
        const commitRequest: CommitRequestModel = {
          message: response.message,
          data: this.node,
        };
        this._productsGitRepository.persistEr(this.moduleNameSelected, commitRequest).subscribe({
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
