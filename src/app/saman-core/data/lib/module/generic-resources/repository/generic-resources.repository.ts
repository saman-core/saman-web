import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { PageModel, PageableModel } from '@saman-core/data';
import { AuthService } from '@saman-core/core';

@Injectable()
export class GenericResourceRepository {
  private _dataformat = 'resources1';
  private _port = '';

  constructor(
    private _datasourceFactory: DatasourceFactory,
    private _authService: AuthService,
  ) {}

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
    } catch (_) {
      /* empty */
    }
    if (searchField !== '') params[searchField] = searchValue;

    return this._getDataSource(resourceName).getPageByMethod<PageModel<object>>(
      '',
      pageableModel,
      params,
      false,
      true,
    );
  }

  public getByIdSync(resourceName: string, id: number | string): object {
    return this._sendXMLHttpSyncRequest(resourceName, id);
  }

  public getAllByIdsSync(resourceName: string, ids: number[] | string[]): object[] {
    return this._sendXMLHttpSyncRequest(resourceName, `?ids=${ids}`);
  }

  private _getDataSource(resourceName: string): DatasourceConsumer {
    const { dataformat, port, server } = this._getParams(resourceName);
    return this._datasourceFactory.getConsumer(dataformat, port, server, resourceName);
  }

  private _getParams(resourceName: string): { dataformat: string; port: string; server: string } {
    let dataformat = this._dataformat;
    let port = this._port;
    let server = resourceName;

    if (typeof WL[resourceName] !== 'undefined') {
      dataformat = WL[resourceName].dataformat;
      port = WL[resourceName].port;
      server = WL[resourceName].server;
    }
    return { dataformat, port, server };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _sendXMLHttpSyncRequest(resourceName: string, filter: number | string): any {
    const { dataformat, port, server } = this._getParams(resourceName);
    const url = this._datasourceFactory.getUrl(dataformat, port, server, resourceName);
    const token = this._authService.getToken();

    let result;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}/${filter}`, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      result = JSON.parse(xhr.response);
    } else {
      throw new Error('not found or error');
    }
    return result;
  }
}

const WL = {
  occupation: { dataformat: 'format2', port: '9084', server: 'localhost' },
  state: { dataformat: 'format2', port: '9085', server: 'localhost' },
  municipality: { dataformat: 'format2', port: '9085', server: 'localhost' },
  parish: { dataformat: 'format2', port: '9085', server: 'localhost' },
};
