import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { Repository } from '@saman-core/data/lib/base/datasource/repository';
import { NodeModel } from '../model/node.model';
import { CommitRequestModel } from '../model/commit-request.model';
import { ConditionsPropertyModel } from '../model/conditions-property.model';
import { ConditionTypeEnum } from '../model/condition-type.enum';


@Injectable()
export class ResourceRepository implements Repository {
  datasource: DatasourceConsumer;
  private _dataformat = 'format1';
  private _port = '8080';
  private _server = '';
  private _resource = 'products';

  constructor(private _datasourceFactory: DatasourceFactory) {
    this.datasource = this._datasourceFactory.getConsumer(
      this._dataformat,
      this._port,
      this._server,
      this._resource
    );
  }

  public getAllProducts(): Observable<NodeModel[]> {
    return this.datasource.getAllByMethod<NodeModel>('');
  }

  public getProduct(name: string): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(`${name}`);
  }

  public getAllTemplatesByProduct(productName: string): Observable<NodeModel[]> {
    return this.datasource.getAllByMethod<NodeModel>(`${productName}/templates/`);
  }

  public getTemplate(productName: string, templateName: string): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(`${productName}/templates/${templateName}`);
  }

  public persistTemplate(productName: string, templateName: string, commitRequest: CommitRequestModel): Observable<NodeModel> {
    return this.datasource.saveMethod<NodeModel, CommitRequestModel>(`${productName}/templates/${templateName}`, commitRequest, {}, true, true, true);
  }

  public getConditionsProperty(productName: string, templateName: string, propertyName: string): Observable<ConditionsPropertyModel> {
    return this.datasource.getByMethod<ConditionsPropertyModel>(`${productName}/templates/${templateName}/conditions/${propertyName}`);
  }

  public getAllConditionsPropertiesByTemplate(productName: string, templateName: string): Observable<ConditionsPropertyModel[]> {
    return this.datasource.getAllByMethod<ConditionsPropertyModel>(`${productName}/templates/${templateName}/conditions/`);
  }

  public getCondition(productName: string, templateName: string, propertyName: string, conditionType: ConditionTypeEnum): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(`${productName}/templates/${templateName}/conditions/${propertyName}/${conditionType}`);
  }

  public persistCondition(productName: string, templateName: string, propertyName: string, conditionType: ConditionTypeEnum, commitRequest: CommitRequestModel): Observable<NodeModel> {
    return this.datasource.saveMethod<NodeModel, CommitRequestModel>(`${productName}/templates/${templateName}/conditions/${propertyName}/${conditionType}`, commitRequest);
  }

  public deleteCondition(productName: string, templateName: string, propertyName: string, conditionType: ConditionTypeEnum, commitRequest: CommitRequestModel): Observable<NodeModel> {
    return this.datasource.deleteMethodWithBody<NodeModel, CommitRequestModel>(`${productName}/templates/${templateName}/conditions/${propertyName}/${conditionType}`, commitRequest);
  }
}
