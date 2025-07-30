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
export class BusinessGitRepository implements Repository {
  private _datasourceFactory = inject(DatasourceFactory);

  datasource: DatasourceConsumer;
  private _dataformat = 'format2';
  private _port = '9083';
  private _server = 'template-builder';
  private _resource = 'business';

  constructor() {
    this.datasource = this._datasourceFactory.getConsumer(
      this._dataformat,
      this._port,
      this._server,
      this._resource,
    );
  }

  public getAllTemplates(): Observable<NodeModel[]> {
    return this.datasource.getAllByMethod<NodeModel>(`templates/`);
  }

  public getTemplate(templateName: string): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(`templates/${templateName}`);
  }

  public persistTemplate(
    templateName: string,
    commitRequest: CommitRequestModel,
  ): Observable<NodeModel> {
    return this.datasource.saveMethod<NodeModel, CommitRequestModel>(
      `templates/${templateName}`,
      commitRequest,
      {},
      true,
      true,
      true,
    );
  }

  public getConditionsProperty(
    templateName: string,
    propertyName: string,
  ): Observable<ConditionsPropertyModel> {
    return this.datasource.getByMethod<ConditionsPropertyModel>(
      `templates/${templateName}/conditions/${propertyName}`,
    );
  }

  public getAllConditionsPropertiesByTemplate(
    templateName: string,
  ): Observable<ConditionsPropertyModel[]> {
    return this.datasource.getAllByMethod<ConditionsPropertyModel>(
      `templates/${templateName}/conditions/`,
    );
  }

  public getCondition(
    templateName: string,
    propertyName: string,
    conditionType: ConditionTypeEnum,
  ): Observable<NodeModel> {
    return this.datasource.getByMethod<NodeModel>(
      `templates/${templateName}/conditions/${propertyName}/${conditionType}`,
    );
  }

  public persistCondition(
    templateName: string,
    propertyName: string,
    conditionType: ConditionTypeEnum,
    commitRequest: CommitRequestModel,
  ): Observable<NodeModel> {
    return this.datasource.saveMethod<NodeModel, CommitRequestModel>(
      `templates/${templateName}/conditions/${propertyName}/${conditionType}`,
      commitRequest,
    );
  }

  public deleteCondition(
    templateName: string,
    propertyName: string,
    conditionType: ConditionTypeEnum,
    commitRequest: CommitRequestModel,
  ): Observable<NodeModel> {
    return this.datasource.deleteMethodWithBody<NodeModel, CommitRequestModel>(
      `templates/${templateName}/conditions/${propertyName}/${conditionType}`,
      commitRequest,
    );
  }
}
