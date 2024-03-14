import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { ConditionModel } from '../model/condition.model';
import { ConditionRequestModel } from '../model/condition-request.model';

@Injectable()
export class ConditionRepository {
  constructor(private _datasourceFactory: DatasourceFactory) {}

  public getConsumer(productName: string, templateName: string): DatasourceConsumer {
    const dataformat = 'format2';
    const port = '';
    const server = `conditions-${productName}-${templateName}`;
    const resource = 'conditions';

    return this._datasourceFactory.getConsumer(dataformat, port, server, resource);
  }

  public eval(
    consumer: DatasourceConsumer,
    conditionRequest: ConditionRequestModel,
  ): Observable<ConditionModel[]> {
    return consumer.saveMethod<ConditionModel[], ConditionRequestModel>(
      'eval',
      conditionRequest,
    );
  }
}
