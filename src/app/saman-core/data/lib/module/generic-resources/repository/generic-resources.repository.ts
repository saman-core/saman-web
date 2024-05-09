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
      resourceName,
      pageableModel,
      params,
      false,
      true,
    );
  }

  private _getDataSource(resourceName: string): DatasourceConsumer {
    return this._datasourceFactory.getConsumer(
      this._dataformat,
      this._port,
      resourceName,
      resourceName,
    );
  }
}
