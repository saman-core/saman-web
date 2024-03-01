import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFlatNode, NodeModel, ResourceRepository } from '@saman-core/data';
import { DynamicDataSource } from './dynamic-data-source';
import { TemplateConditionDialogComponent } from '../template-condition-dialog/template-condition-dialog.component';
import { combineLatestWith } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-template-conditions',
  templateUrl: './template-conditions.component.html',
  styleUrl: './template-conditions.component.scss'
})
export class TemplateConditionsComponent {
  @ViewChild(MatTable) table: MatTable<unknown>;
  displayedColumns: string[] = ['property', 'value', 'visible', 'disable', 'alert', 'validate'];
  elementData: ConditionNodes[] = [];


  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  step = 0;
  data = '{}';
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  templateNameSelected = '';

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
    this.elementData = [];
    const templateObservable = this._resourceRepository.getTemplate(productName, templateName);
    const conditionsObservable = this._resourceRepository.getAllConditionsPropertiesByTemplate(productName, templateName);
    const combinedObservable = templateObservable.pipe(
      combineLatestWith(conditionsObservable)
    );

    combinedObservable.subscribe(([node, conditions]) => {
      const json = JSON.parse(atob(node.content));
      const properties: string[] = json['properties'];
      this.table.renderRows();

      properties.forEach(p => this.elementData.push(new ConditionNodes(p)));


      console.log(this.elementData);
      
      conditions.forEach(c => {
        const found = this.elementData.find(e => e.property.toLowerCase() === c.property.toLowerCase());
        if (typeof found === 'undefined') {
          console.error(c);
        } else {
          console.log(c);
        }
      });
      this.table.renderRows();

      this.templateNameSelected = templateName;
      this.step = 1;
    });
  }

  setStep(index: number) {
    this.step = index;
  }
}

export class ConditionNodes {
  public value: NodeModel | null = null;
  public visible: NodeModel | null = null;
  public disable: NodeModel | null = null;
  public alert: NodeModel | null = null;
  public validate: NodeModel | null = new NodeModel();

  constructor(public property: string) {}
}
