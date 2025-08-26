import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  CommitRequestModel,
  NodeModel,
  ProductsGitRepository,
  ConditionTypeEnum,
  ConditionsPropertyModel,
} from '@saman-core/data';
import {
  ConditionDialogRequest,
  ConditionDialogResponse,
  TemplateConditionDialogComponent,
} from '../template-condition-dialog/template-condition-dialog.component';
import { combineLatestWith } from 'rxjs/operators';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteConditionDialogComponent,
  DeleteDialogRequest,
  DeleteDialogResponse,
} from '../delete-condition-dialog/delete-condition-dialog.component';
import { AlertSubscriptor } from '@saman-core/core';
import { FormUtilService } from '@saman-core/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-template-conditions',
  templateUrl: './template-conditions.component.html',
  styleUrl: './template-conditions.component.scss',
  imports: [
    MatButtonModule,
    MatTooltip,
    MatIconModule,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatSelectModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class TemplateConditionsComponent {
  private readonly _productsGitRepository = inject(ProductsGitRepository);
  private readonly _dialog = inject(MatDialog);
  private readonly _alertSubscriptor = inject(AlertSubscriptor);
  private readonly _fomrUtilService = inject(FormUtilService);
  private readonly _router = inject(Router);
  private readonly _cdr= inject(ChangeDetectorRef);

  static readonly NAMESPACE = 'saman-core/property';
  static readonly NOT_FOUND = ' [Not_Found]';
  readonly DISPLAYED_COLUMNS: string[] = [
    'property',
    'value',
    'visible',
    'disable',
    'alert',
    'validate',
    'options',
  ];
  readonly conType = ConditionTypeEnum;
  modules: string[] = [];
  products: string[] = [];
  templates: string[] = [];
  moduleNameSelected = '';
  productNameSelected = '';
  templateNameSelected = '';
  template: object = {};
  elementData: ConditionNodes[] = [];

  constructor() {
    this.refreshModules();
  }

  navigateToStructure() {
    this._router.navigate(['/template/structure']);
  }

  navigateToManage() {
    this._router.navigate(['/template/manage']);
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
        });
    } else {
      this.products = [];
      this.productNameSelected = '';
    }
    this.refreshTemplates();
  }

  refreshTemplates() {
    if (this.productNameSelected != '') {
      this._productsGitRepository
        .getAllTemplatesByProduct(this.moduleNameSelected, this.productNameSelected)
        .subscribe((templates) => {
          this.templates = templates.map((p) => p.name);
          this.templateNameSelected = '';
        });
    } else {
      this.templates = [];
      this.templateNameSelected = '';
    }
  }

  refreshConditionsTable(): void {
    this.elementData = [];
    this._cdr.detectChanges();
    const templateObservable = this._productsGitRepository.getTemplate(
      this.moduleNameSelected,
      this.productNameSelected,
      this.templateNameSelected,
    );
    const conditionsObservable = this._productsGitRepository.getAllConditionsPropertiesByTemplate(
      this.moduleNameSelected,
      this.productNameSelected,
      this.templateNameSelected,
    );
    const combinedObservable = templateObservable.pipe(combineLatestWith(conditionsObservable));
    combinedObservable.subscribe(([node, conditions]) => {
      this._fillElementData(node, conditions);
    });
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
    const dialogRef = this._dialog.open(DeleteConditionDialogComponent, {
      data: deleteDialogRequest,
    });

    dialogRef.afterClosed().subscribe((response: DeleteDialogResponse) => {
      if (response.accepted) {
        const commitRequest: CommitRequestModel = {
          message: response.message,
          data: node,
        };
        this._productsGitRepository
          .deleteCondition(
            moduleName,
            productName,
            templateName,
            node.name,
            conditionType,
            commitRequest,
          )
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
    const json = JSON.parse(decodeURIComponent(escape(atob(node.content))));
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
    this._cdr.detectChanges();
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
