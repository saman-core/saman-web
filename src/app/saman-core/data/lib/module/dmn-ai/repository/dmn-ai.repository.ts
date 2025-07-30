import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from '@saman-core/data';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { DmnAiModel } from '../model/dmn-ai.model';
import { DmnAiRequestModel } from '../model/dmn-ai-request.model';

@Injectable({
  providedIn: 'root',
})
export class DmnAiRepository implements Repository {
  private readonly _datasourceFactory = inject(DatasourceFactory);

  datasource: DatasourceConsumer;
  private readonly _dataformat = 'format2';
  private readonly _port = '9081';
  private readonly _server = 'dmn-ai';
  private readonly _resource = '';

  constructor() {
    this.datasource = this._datasourceFactory.getConsumer(
      this._dataformat,
      this._port,
      this._server,
      this._resource,
    );
  }

  public generate(message: DmnAiRequestModel): Observable<DmnAiModel> {
    return this.datasource.saveMethod<DmnAiModel, DmnAiRequestModel>(
      `generate`,
      message,
      {},
      true,
      true,
    );
  }

  public explain(message: DmnAiRequestModel): Observable<DmnAiModel> {
    return this.datasource.saveMethod<DmnAiModel, DmnAiRequestModel>(
      `explain`,
      message,
      {},
      true,
      true,
    );
  }
}
