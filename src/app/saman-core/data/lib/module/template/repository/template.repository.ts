import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { Repository } from '@saman-core/data';


@Injectable()
export class TemplateRepository implements Repository {
  datasource: DatasourceConsumer;
  private _dataformat = 'format2';
  private _port = '9081';
  private _server = 'template';
  private _resource = 'templates';

  constructor(private _datasourceFactory: DatasourceFactory) {
    this.datasource = this._datasourceFactory.getConsumer(
      this._dataformat,
      this._port,
      this._server,
      this._resource
    );
  }

  public getJson(productName: string, templateName: string): Observable<object> {
    return this.datasource.getByMethod<object>(`${productName}/${templateName}`, {}, true, true);
  }
}
