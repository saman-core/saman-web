import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { ConditionTypeEnum, Repository } from '@saman-core/data';
import { NodeModel } from '../model/node.model';
import { CommitRequestModel } from '../model/commit-request.model';
import { ConditionsPropertyModel } from '../model/conditions-property.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsGitRepository implements Repository {
  private readonly _datasourceFactory = inject(DatasourceFactory);

  datasource: DatasourceConsumer;
  private readonly _dataformat = 'format2';
  private readonly _port = '9083';
  private readonly _server = 'template-builder';
  private readonly _resource = 'products';

  constructor() {
    this.datasource = this._datasourceFactory.getConsumer(
      this._dataformat,
      this._port,
      this._server,
      this._resource,
    );
  }

  public getAllModules(): Observable<NodeModel[]> {
    return this.datasource.getAllByMethod<NodeModel>('');
  }

  public getAllProductsByModule(moduleName: string): Observable<NodeModel[]> {
    return this.datasource.getAllByMethod<NodeModel>(`${moduleName}`);
  }

  public getProduct(moduleName: string, productName: string): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(`${moduleName}/${productName}`);
  }

  public getAllTemplatesByProduct(
    moduleName: string,
    productName: string,
  ): Observable<NodeModel[]> {
    return this.datasource.getAllByMethod<NodeModel>(`${moduleName}/${productName}/templates/`);
  }

  public getTemplate(
    moduleName: string,
    productName: string,
    templateName: string,
  ): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(
      `${moduleName}/${productName}/templates/${templateName}`,
    );
  }

  public persistTemplate(
    moduleName: string,
    productName: string,
    templateName: string,
    commitRequest: CommitRequestModel,
  ): Observable<NodeModel> {
    return this.datasource.saveMethod<NodeModel, CommitRequestModel>(
      `${moduleName}/${productName}/templates/${templateName}`,
      commitRequest,
      {},
      true,
      true,
      true,
    );
  }

  public getConditionsProperty(
    moduleName: string,
    productName: string,
    templateName: string,
    propertyName: string,
  ): Observable<ConditionsPropertyModel> {
    return this.datasource.getByMethod<ConditionsPropertyModel>(
      `${moduleName}/${productName}/templates/${templateName}/conditions/${propertyName}`,
    );
  }

  public getAllConditionsPropertiesByTemplate(
    moduleName: string,
    productName: string,
    templateName: string,
  ): Observable<ConditionsPropertyModel[]> {
    return this.datasource.getAllByMethod<ConditionsPropertyModel>(
      `${moduleName}/${productName}/templates/${templateName}/conditions/`,
    );
  }

  public getCondition(
    moduleName: string,
    productName: string,
    templateName: string,
    propertyName: string,
    conditionType: ConditionTypeEnum,
  ): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(
      `${moduleName}/${productName}/templates/${templateName}/conditions/${propertyName}/${conditionType}`,
    );
  }

  public persistCondition(
    moduleName: string,
    productName: string,
    templateName: string,
    propertyName: string,
    conditionType: ConditionTypeEnum,
    commitRequest: CommitRequestModel,
  ): Observable<NodeModel> {
    return this.datasource.saveMethod<NodeModel, CommitRequestModel>(
      `${moduleName}/${productName}/templates/${templateName}/conditions/${propertyName}/${conditionType}`,
      commitRequest,
    );
  }

  public deleteCondition(
    moduleName: string,
    productName: string,
    templateName: string,
    propertyName: string,
    conditionType: ConditionTypeEnum,
    commitRequest: CommitRequestModel,
  ): Observable<NodeModel> {
    return this.datasource.deleteMethodWithBody<NodeModel, CommitRequestModel>(
      `${moduleName}/${productName}/templates/${templateName}/conditions/${propertyName}/${conditionType}`,
      commitRequest,
    );
  }

  public getWorkflow(moduleName: string, productName: string): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(`${moduleName}/${productName}/workflow`);
  }

  public persistWorkflow(
    moduleName: string,
    productName: string,
    commitRequest: CommitRequestModel,
  ): Observable<NodeModel> {
    return this.datasource.saveMethod<NodeModel, CommitRequestModel>(
      `${moduleName}/${productName}/workflow`,
      commitRequest,
      {},
      true,
      true,
      true,
    );
  }

  public getEr(moduleName: string): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(`${moduleName}/er/diagram`);
  }

  public persistEr(moduleName: string, commitRequest: CommitRequestModel): Observable<NodeModel> {
    return this.datasource.saveMethod<NodeModel, CommitRequestModel>(
      `${moduleName}/er/diagram`,
      commitRequest,
      {},
      true,
      true,
      true,
    );
  }
}
