import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CommitRequestModel, NodeModel, ProductsGitRepository } from '@saman-core/data';
import { ActionHierarchyType, HierarchyEditorComponent } from '@saman-core/common';
import { AlertSubscriptor } from '@saman-core/core';
import {
  CommitHierarchyDialogComponent,
  CommitDialogResponse,
} from '../commit-hierarchy-dialog/commit-hierarchy-dialog.component';

@Component({
  selector: 'app-module-hierarchy',
  templateUrl: './module-hierarchy.component.html',
  styleUrls: ['./module-hierarchy.component.scss'],
  standalone: true,
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
    ReactiveFormsModule,
    MatTooltip,
    RouterModule,
  ],
})
export class ModuleHierarchyComponent {
  private readonly _router = inject(Router);
  private readonly _productsGitRepository = inject(ProductsGitRepository);
  private readonly _alertSubscriptor = inject(AlertSubscriptor);
  private readonly _dialog = inject(MatDialog);

  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  modules: string[] = [];
  moduleNameSelected = '';
  node: NodeModel;

  constructor() {
    this.refreshModules();
  }

  navigateToManage() {
    this._router.navigate(['/module/manage']);
  }

  refreshModules() {
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
    });
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
            this._alertSubscriptor.success('Hierarchy saved successfully');
          },
          error: (e) => {
            console.error(e);
            this._alertSubscriptor.error('Hierarchy could not be saved');
          },
        });
      }
    });
  }
}
