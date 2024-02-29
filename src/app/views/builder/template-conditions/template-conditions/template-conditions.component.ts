import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFlatNode, ResourceRepository } from '@saman-core/data';
import { DynamicDataSource } from './dynamic-data-source';
import { TemplateConditionDialogComponent } from '../template-condition-dialog/template-condition-dialog.component';

@Component({
  selector: 'app-template-conditions',
  templateUrl: './template-conditions.component.html',
  styleUrl: './template-conditions.component.scss'
})
export class TemplateConditionsComponent {
  dataSource2 = ELEMENT_DATA;
  displayedColumns: string[] = ['property', 'value', 'visible', 'disable', 'alert', 'validate'];


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
    this._resourceRepository.getTemplate(productName, templateName).subscribe(() => {
      this.templateNameSelected = templateName;
      this.step = 1;
    });
  }

  setStep(index: number) {
    this.step = index;
  }
}

export interface PeriodicElement {
  property: string;
  value: number;
  visible: string;
  disable: string;
  alert: string;
  validate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {property: 'Hydrogen', value: 1.0079, visible: 'H', disable: 'Li', alert: 'Li', validate: 'Li'},
  {property: 'Helium', value: 4.0026, visible: 'He', disable: 'Li', alert: 'Li', validate: 'Li'},
  {property: 'Lithium', value: 6.941, visible: 'Li', disable: 'Li', alert: 'Li', validate: 'Li'},
];
