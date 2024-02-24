import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFlatNode, ResourceRepository } from '@saman-core/data';
import { DynamicDataSource } from './dynamic-data-source';
import { TemplateFormDialogComponent } from '../template-form-dialog/template-form-dialog.component';

@Component({
  selector: 'app-template-structure',
  templateUrl: './template-structure.component.html',
  styleUrl: './template-structure.component.scss',
})
export class TemplateStructureComponent {
  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  step = 0;
  data = '{}';
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;

  constructor(private _resourceRepository: ResourceRepository) {
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
      this.dynamicEditorLoader.clear();
      const componentRef = this.dynamicEditorLoader.createComponent(TemplateFormDialogComponent);
      componentRef.instance.productName = productName;
      componentRef.instance.templateName = templateName;
      componentRef.instance.node = node;
      componentRef.instance.exitEmitter.subscribe(() => {
        this.setStep(0);
        componentRef.destroy();
      });
      this.step = 1;
    });
  }

  setStep(index: number) {
    this.step = index;
  }
}
