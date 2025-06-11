import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFlatNode, ProductsGitRepository } from '@saman-core/data';
import { DynamicDataSource } from './dynamic-data-source';
import { TemplateFormBuilderComponent } from '../template-form-builder/template-form-builder.component';

@Component({
    selector: 'app-template-structure',
    templateUrl: './template-structure.component.html',
    styleUrl: './template-structure.component.scss',
    standalone: false
})
export class TemplateStructureComponent {
  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  step = 0;
  data = '{}';
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  templateNameSelected = '';

  constructor(private readonly _productsGitRepository: ProductsGitRepository) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, _productsGitRepository);

    this._productsGitRepository.getAllModules().subscribe((products) => {
      this.dataSource.data = products.map((p) => new DynamicFlatNode(p.name, 0, '', '', true));
    });
  }

  refreshProductTree() {
    this._productsGitRepository.getAllModules().subscribe((products) => {
      this.dataSource.data = products.map((p) => new DynamicFlatNode(p.name, 0, '', '', true));
    });
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  openEditor(moduleName: string, productName: string, templateName: string) {
    this._productsGitRepository.getTemplate(moduleName, productName, templateName).subscribe((node) => {
      this.dynamicEditorLoader.clear();
      const componentRef = this.dynamicEditorLoader.createComponent(TemplateFormBuilderComponent);
      componentRef.instance.productName = moduleName;
      componentRef.instance.productName = productName;
      componentRef.instance.templateName = templateName;
      componentRef.instance.node = node;
      componentRef.instance.exitEmitter.subscribe(() => {
        this.setStep(0);
        this.templateNameSelected = '';
        componentRef.destroy();
      });

      this.templateNameSelected = templateName;
      this.step = 1;
    });
  }

  setStep(index: number) {
    this.step = index;
  }
}
