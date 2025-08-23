import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { CommitRequestModel, NodeModel, ProductsGitRepository } from '@saman-core/data';
import { ActionWorkflowType, WorkflowEditorComponent } from '@saman-core/common';
import { AlertSubscriptor } from '@saman-core/core';
import {
  CommitWorkflowDialogComponent,
  CommitDialogResponse,
} from '../commit-workflow-dialog/commit-workflow-dialog.component';

@Component({
  selector: 'app-product-workflow',
  templateUrl: './product-workflow.component.html',
  styleUrl: './product-workflow.component.scss',
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class ProductWorkflowComponent {
  private readonly _router = inject(Router);
  private readonly _productsGitRepository = inject(ProductsGitRepository);
  private readonly _alertSubscriptor = inject(AlertSubscriptor);
  private readonly _dialog = inject(MatDialog);

  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  modules: string[] = [];
  products: string[] = [];
  moduleNameSelected = '';
  productNameSelected = '';
  node: NodeModel;

  constructor() {
    this.refreshModules();
  }

  navigateToManage() {
    this._router.navigate(['/product/manage']);
  }

  refreshModules() {
    this._productsGitRepository.getAllModules().subscribe((products) => {
      this.modules = products.map((p) => p.name);
    });
    this.refreshProducts();
  }

  refreshProducts() {
    if (this.moduleNameSelected != '') {
      this._productsGitRepository
        .getAllProductsByModule(this.moduleNameSelected)
        .subscribe((products) => {
          this.products = products.map((p) => p.name);
          this.productNameSelected = '';
          this.dynamicEditorLoader.clear();
        });
    } else {
      this.products = [];
      this.productNameSelected = '';
    }
  }

  openEditor(productName: string) {
    this._productsGitRepository
      .getWorkflow(this.moduleNameSelected, productName)
      .subscribe((node) => {
        this.dynamicEditorLoader.clear();
        this.node = node;
        const componentRef = this.dynamicEditorLoader.createComponent(WorkflowEditorComponent);
        componentRef.instance.graphJsonBase64 = node.content;
        componentRef.instance.actionEmitter.subscribe((action: ActionWorkflowType) => {
          this.actionsListener(action, componentRef);
        });
      });
  }

  actionsListener(action: ActionWorkflowType, componentRef: ComponentRef<WorkflowEditorComponent>) {
    switch (action.action) {
      case 'save':
        this.save(action.dataBase64);
        break;
      case 'cancel':
        this.node = null;
        this.products = [];
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
