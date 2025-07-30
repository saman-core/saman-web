import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { Repository } from '@saman-core/data';

@Injectable({
  providedIn: 'root',
})
export class TemplateRepository implements Repository {
  private readonly _datasourceFactory = inject(DatasourceFactory);

  datasource: DatasourceConsumer;
  private readonly _dataformat = 'format2';
  private readonly _port = '9081';
  private readonly _server = 'template';
  private readonly _resource = 'templates';

  constructor() {
    this.datasource = this._datasourceFactory.getConsumer(
      this._dataformat,
      this._port,
      this._server,
      this._resource,
    );
  }

  public getJson(
    moduleName: string,
    productName: string,
    templateName: string,
  ): Observable<object> {
    return this.datasource.getByMethod<object>(
      `${moduleName}/${productName}/${templateName}`,
      {},
      true,
      true,
    );
  }
}
