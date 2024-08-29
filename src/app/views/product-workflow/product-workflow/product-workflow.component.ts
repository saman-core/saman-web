import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductsGitRepository } from '@saman-core/data';
import { ActionWorkflowType, WorkflowEditorComponent } from '@saman-core/common';

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

  constructor(private _productsGitRepository: ProductsGitRepository) {
    this.refreshProductTree();
  }

  refreshProductTree() {
    this._productsGitRepository.getAllProducts().subscribe((products) => {
      this.products = products.map((p) => p.name);
    });
  }

  openEditor(productName: string) {
    this._productsGitRepository.getWorkflow(productName).subscribe((node) => {
      this.dynamicEditorLoader.clear();
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

  actionsListener(action: ActionWorkflowType, componentRef) {
    switch (action.action) {
      case 'save':
        console.log(action.dataBase64);
        break;
      case 'cancel':
        console.log('cancel');
        this.setStep(0);
        this.productNameSelected = '';
        componentRef.destroy();
        break;
    }
  }
}
