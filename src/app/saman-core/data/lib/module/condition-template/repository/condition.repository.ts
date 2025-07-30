import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { ConditionModel } from '../model/condition.model';
import { ConditionRequestModel } from '../model/condition-request.model';

@Injectable({
  providedIn: 'root',
})
export class ConditionRepository {
  private readonly _datasourceFactory = inject(DatasourceFactory);

  public getConsumer(
    moduleName: string,
    productName: string,
    templateName: string,
  ): DatasourceConsumer {
    const dataformat = 'format2';
    const port = '9086';
    const server = `${moduleName}-conditions-${productName}-${templateName}`;
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
      {},
      true,
      true,
    );
  }
}
