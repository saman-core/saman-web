import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatasourceConsumer } from './datasource.consumer';

@Injectable()
export class DatasourceFactory {
  constructor(private _http: HttpClient) {}

  public getConsumer(
    msServer: string,
    actionUrl: string
  ): DatasourceConsumer {
    const protocol = 'http';
    const url = `${msServer}.sige3.link/${actionUrl}`;
    return new DatasourceConsumer(this._http, protocol, url);
  }
}
