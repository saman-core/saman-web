import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { DynamicFlatNode, ResourceRepository } from '@saman-core/data';
import { DynamicDataSource } from './dynamic-data-source';
import { MatDialog } from '@angular/material/dialog';
import { TemplateFormDialogComponent } from '../template-form-dialog/template-form-dialog.component';

@Component({
  selector: 'app-template-structure',
  templateUrl: './template-structure.component.html',
  styleUrl: './template-structure.component.scss',
})
export class TemplateStructureComponent {
  data = '{}';
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;

  constructor(
    private _resourceRepository: ResourceRepository,
    private _dialog: MatDialog
    ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, _resourceRepository);

    this._resourceRepository.getAllProducts().subscribe((products) => {
      this.dataSource.data = products.map((p) => new DynamicFlatNode(p.name, 0, '', true));
    });
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  openDialog(productName: string, templateName: string) {
    this._resourceRepository.getTemplate(productName, templateName).subscribe((node) => {
      this._dialog.open(TemplateFormDialogComponent, {
        data: {
          node: node,
        },
      });
    });
  }
}
