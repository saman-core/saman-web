import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatasourceConsumer } from './datasource.consumer';
import { DATA_CONFIG, DataConfType } from '../data.config';

@Injectable()
export class DatasourceFactory {
  private _confType: DataConfType;

  constructor(
    @Inject(DATA_CONFIG) _dataConfType: DataConfType,
    private _http: HttpClient,
  ) {
    this._confType = _dataConfType;
  }

  public getConsumer(
    datasourcesFormat: string,
    port: string,
    server: string,
    resource: string,
  ): DatasourceConsumer {
    const format = this._confType[datasourcesFormat];
    let url = format.replaceAll('{PORT}', port);
    url = url.replaceAll('{SERVER}', server);
    url = url.replaceAll('{RESOURCE}', resource);
    return new DatasourceConsumer(this._http, url);
  }
}
