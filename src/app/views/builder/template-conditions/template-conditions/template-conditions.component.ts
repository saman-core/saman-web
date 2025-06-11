import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import {
  CommitRequestModel,
  DynamicFlatNode,
  NodeModel,
  ProductsGitRepository,
  ConditionTypeEnum,
  ConditionsPropertyModel,
} from '@saman-core/data';
import { DynamicDataSource } from './dynamic-data-source';
import {
  ConditionDialogRequest,
  ConditionDialogResponse,
  TemplateConditionDialogComponent,
} from '../template-condition-dialog/template-condition-dialog.component';
import { combineLatestWith } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteDialogRequest,
  DeleteDialogResponse,
} from '../delete-dialog/delete-dialog.component';
import { AlertSubscriptor } from '@saman-core/core';
import { Buffer } from 'buffer';
import { FormUtilService } from '@saman-core/common';

@Component({
    selector: 'app-template-conditions',
    templateUrl: './template-conditions.component.html',
    styleUrl: './template-conditions.component.scss',
    standalone: false
})
export class TemplateConditionsComponent {
  static readonly NAMESPACE = 'saman-core/property';
  static readonly NOT_FOUND = ' [Not_Found]';
  @ViewChild(MatTable) table: MatTable<unknown>;
  displayedColumns: string[] = [
    'property',
    'value',
    'visible',
    'disable',
    'alert',
    'validate',
    'options',
  ];
  elementData: ConditionNodes[] = [];
  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  step = 0;
  data = '{}';
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  moduleSelected = '';
  templateNameSelected = '';
  productNameSelected = '';
  conType = ConditionTypeEnum;
  template: object = {};

  constructor(
    private readonly _productsGitRepository: ProductsGitRepository,
    private readonly _dialog: MatDialog,
    private readonly _alertSubscriptor: AlertSubscriptor,
    private readonly _fomrUtilService: FormUtilService,
  ) {
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

  refreshConditionsTable(): void {
    this.elementData = [];
    this.table.renderRows();
    const templateObservable = this._productsGitRepository.getTemplate(
      this.moduleSelected,
      this.productNameSelected,
      this.templateNameSelected,
    );
    const conditionsObservable = this._productsGitRepository.getAllConditionsPropertiesByTemplate(
      this.moduleSelected,
      this.productNameSelected,
      this.templateNameSelected,
    );
    const combinedObservable = templateObservable.pipe(combineLatestWith(conditionsObservable));
    combinedObservable.subscribe(([node, conditions]) => {
      this._fillElementData(node, conditions);
    });
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  openConditionSelector(moduleName: string, productName: string, templateName: string) {
    this.elementData = [];
    this.table.renderRows();
    const templateObservable = this._productsGitRepository.getTemplate(
      moduleName,
      productName,
      templateName,
    );
    const conditionsObservable = this._productsGitRepository.getAllConditionsPropertiesByTemplate(
      moduleName,
      productName,
      templateName,
    );
    const combinedObservable = templateObservable.pipe(combineLatestWith(conditionsObservable));
    combinedObservable.subscribe(([node, conditions]) => {
      this._fillElementData(node, conditions);
      this.moduleSelected = moduleName;
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

  public createDmn(
    moduleName: string,
    productName: string,
    templateName: string,
    propertyName: string,
    conditionType: ConditionTypeEnum,
  ) {
    const node: NodeModel = {
      name: propertyName,
    };
    const conditionDialogRequest: ConditionDialogRequest = {
      data: '',
      namespace: TemplateConditionsComponent.NAMESPACE,
      dmnName: this._generateDmnName(propertyName, conditionType),
      template: this.template,
      componentsKey: this._fomrUtilService.getDataComponentsKey(this.template),
    };
    const dialogRef = this._dialog.open(TemplateConditionDialogComponent, {
      data: conditionDialogRequest,
      height: '95%',
      width: '95%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((response: ConditionDialogResponse) => {
      if (response.accepted) {
        node.content = response.data;
        const commitRequest: CommitRequestModel = {
          message: response.message,
          data: node,
        };
        this._productsGitRepository
          .persistCondition(
            moduleName,
            productName,
            templateName,
            propertyName,
            conditionType,
            commitRequest,
          )
          .subscribe({
            next: (node) => {
              this._alertSubscriptor.success(
                `Template updated successfully. Response Id: ${node.id}`,
              );
              this.refreshConditionsTable();
            },
            error: (e) => {
              console.error(e);
              this._alertSubscriptor.error('Template could not be created');
            },
          });
      }
    });
  }

  public updateDmn(
    moduleName: string,
    productName: string,
    templateName: string,
    propertyName: string,
    conditionType: ConditionTypeEnum,
  ) {
    this._productsGitRepository
      .getCondition(moduleName, productName, templateName, propertyName, conditionType)
      .subscribe((node) => {
        const conditionDialogRequest: ConditionDialogRequest = {
          data: node.content,
          namespace: TemplateConditionsComponent.NAMESPACE,
          dmnName: this._generateDmnName(propertyName, conditionType),
          template: this.template,
          componentsKey: this._fomrUtilService.getDataComponentsKey(this.template),
        };
        const dialogRef = this._dialog.open(TemplateConditionDialogComponent, {
          data: conditionDialogRequest,
          height: '95%',
          width: '95%',
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((response: ConditionDialogResponse) => {
          if (response.accepted) {
            node.content = response.data;
            const commitRequest: CommitRequestModel = {
              message: response.message,
              data: node,
            };
            this._productsGitRepository
              .persistCondition(
                moduleName,
                productName,
                templateName,
                propertyName,
                conditionType,
                commitRequest,
              )
              .subscribe({
                next: (node) => {
                  this._alertSubscriptor.success(
                    `Template updated successfully. Response Id: ${node.id}`,
                  );
                  this.refreshConditionsTable();
                },
                error: (e) => {
                  console.error(e);
                  this._alertSubscriptor.error('Template could not be saved');
                },
              });
          }
        });
      });
  }

  public deleteDmn(
    moduleName: string,
    productName: string,
    templateName: string,
    node: NodeModel,
    conditionType: ConditionTypeEnum,
  ) {
    const deleteDialogRequest: DeleteDialogRequest = {
      conditionType: conditionType,
      templateName: templateName,
    };
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: deleteDialogRequest,
    });

    dialogRef.afterClosed().subscribe((response: DeleteDialogResponse) => {
      if (response.accepted) {
        const commitRequest: CommitRequestModel = {
          message: response.message,
          data: node,
        };
        this._productsGitRepository
          .deleteCondition(moduleName, productName, templateName, node.name, conditionType, commitRequest)
          .subscribe({
            next: (node) => {
              this._alertSubscriptor.success(
                `Template deleted successfully. Response Id: ${node.id}`,
              );
              this.refreshConditionsTable();
            },
            error: (e) => {
              console.error(e);
              this._alertSubscriptor.error('Template could not be saved');
            },
          });
      }
    });
  }

  private _generateDmnName(templateName: string, conditionType: ConditionTypeEnum): string {
    return `${templateName}_${conditionType.toLowerCase()}`;
  }

  private _fillElementData(node: NodeModel, conditions: ConditionsPropertyModel[]): void {
    const json = JSON.parse(Buffer.from(node.content, 'base64').toString('utf-8'));
    this.template = json;
    const properties: string[] = this._fomrUtilService.getDataComponentsKey(json);
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
    conditionNodes.options = conditionsProperty.conditions[ConditionTypeEnum.OPTIONS];
  }
}

export class ConditionNodes {
  public value: NodeModel | undefined;
  public visible: NodeModel | undefined;
  public disable: NodeModel | undefined;
  public alert: NodeModel | undefined;
  public validate: NodeModel | undefined;
  public options: NodeModel | undefined;

  constructor(public property: string) {}
}
