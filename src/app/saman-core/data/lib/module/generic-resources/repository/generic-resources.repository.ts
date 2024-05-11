import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { PageModel, PageableModel } from '@saman-core/data';

@Injectable()
export class GenericResourceRepository {
  private _dataformat = 'resources1';
  private _port = '';

  constructor(private _datasourceFactory: DatasourceFactory) {
  }

  public loadItems(
    resourceName: string,
    pageableModel: PageableModel,
    filterParam: string,
    searchField: string,
    searchValue: string,
  ): Observable<PageModel<object>> {
    let params = {};
    try {
      params = JSON.parse(`{${filterParam}}`);
    } catch(_) { /* empty */ }
    if (searchField !== '')
      params[searchField] = searchValue; 

    return this._getDataSource(resourceName).getPageByMethod<PageModel<object>>(
      '',
      pageableModel,
      params,
      false,
      true,
    );
  }

  private _getDataSource(resourceName: string): DatasourceConsumer {
    let dataformat = this._dataformat;
    let port = this._port;
    let server = resourceName;

    if (typeof WL[resourceName] !== 'undefined') {
      dataformat = WL[resourceName].dataformat;
      port = WL[resourceName].port;
      server = WL[resourceName].server;
    }

    return this._datasourceFactory.getConsumer(
      dataformat,
      port,
      server,
      resourceName,
    );
  }
}

const WL = {
  state: {dataformat: 'format2', port: '', server: 'location'},
  municipality: {dataformat: 'format2', port: '', server: 'location'},
  parish: {dataformat: 'format2', port: '', server: 'location'},
};
