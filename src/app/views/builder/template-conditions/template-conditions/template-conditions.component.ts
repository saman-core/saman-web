import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFlatNode, NodeModel, ResourceRepository } from '@saman-core/data';
import { DynamicDataSource } from './dynamic-data-source';
import { TemplateConditionDialogComponent } from '../template-condition-dialog/template-condition-dialog.component';
import { combineLatestWith } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { ConditionsPropertyModel } from '@saman-core/data/lib/module/template-builder/model/conditions-property.model';
import { ConditionTypeEnum } from '@saman-core/data/lib/module/template-builder/model/condition-type.enum';

@Component({
  selector: 'app-template-conditions',
  templateUrl: './template-conditions.component.html',
  styleUrl: './template-conditions.component.scss',
})
export class TemplateConditionsComponent {
  static readonly NOT_FOUND = ' [Not_Found]';
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
  productNameSelected = '';
  conType = ConditionTypeEnum;

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
    this.table.renderRows();
    const templateObservable = this._resourceRepository.getTemplate(productName, templateName);
    const conditionsObservable = this._resourceRepository.getAllConditionsPropertiesByTemplate(
      productName,
      templateName,
    );
    const combinedObservable = templateObservable.pipe(combineLatestWith(conditionsObservable));
    combinedObservable.subscribe(([node, conditions]) => {
      this._fillElementData(node, conditions);
      this.templateNameSelected = templateName;
      this.productNameSelected = productName;
      this.step = 1;
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  public isUndefined(v): boolean {
    return typeof v === 'undefined';
  }

  public createDmn(productName: string, templateName: string, conditionType: ConditionTypeEnum) {
    console.log(conditionType);
  }

  public updateDmn(productName: string, templateName: string, node: NodeModel, conditionType: ConditionTypeEnum) {
    console.log(node);
  }

  public deleteDmn(productName: string, templateName: string, node: NodeModel, conditionType: ConditionTypeEnum) {
    console.log(node);
  }

  private _fillElementData(node: NodeModel, conditions: ConditionsPropertyModel[]): void {
    const json = JSON.parse(atob(node.content));
    const properties: string[] = json['properties'];
    const conditionsWithOutproperty: ConditionNodes[] = [];
    properties.forEach((p) => this.elementData.push(new ConditionNodes(p)));
    conditions.forEach((c) => {
      const found = this.elementData.find(
        (e) => e.property.toLowerCase() === c.property.toLowerCase(),
      );
      if (typeof found === 'undefined') {
        const con = new ConditionNodes(c.property + TemplateConditionsComponent.NOT_FOUND);
        this._fillConditionNodes(con, c);
        conditionsWithOutproperty.push(con);
      } else {
        this._fillConditionNodes(found, c);
      }
    });
    this.elementData = this.elementData.concat(conditionsWithOutproperty);
    this.table.renderRows();
  }

  private _fillConditionNodes(
    conditionNodes: ConditionNodes,
    conditionsProperty: ConditionsPropertyModel,
  ): void {
    conditionNodes.value = conditionsProperty.conditions[ConditionTypeEnum.VALUE];
    conditionNodes.visible = conditionsProperty.conditions[ConditionTypeEnum.VISIBLE];
    conditionNodes.disable = conditionsProperty.conditions[ConditionTypeEnum.DISABLE];
    conditionNodes.alert = conditionsProperty.conditions[ConditionTypeEnum.ALERT];
    conditionNodes.validate = conditionsProperty.conditions[ConditionTypeEnum.VALIDATE];
  }
}

export class ConditionNodes {
  public value: NodeModel | undefined;
  public visible: NodeModel | undefined;
  public disable: NodeModel | undefined;
  public alert: NodeModel | undefined;
  public validate: NodeModel | undefined;

  constructor(public property: string) {}
}
