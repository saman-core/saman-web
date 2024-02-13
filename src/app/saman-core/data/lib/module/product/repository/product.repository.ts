import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { PageModel } from '@saman-core/data/lib/base/pagination/page.model';
import { PageableModel } from '@saman-core/data/lib/base/pagination/pageable.model';
import { Repository } from '@saman-core/data/lib/base/datasource/repository';
import { ProductModel } from '@saman-core/data/lib/module/product/model/product.model';

@Injectable()
export class ProductRepository implements Repository {
  datasource: DatasourceConsumer;
  private _dataformat = 'format1';
  private _port = '8080';
  private _server = '';
  private _resource = 'products';

  constructor(private _datasourceFactory: DatasourceFactory) {
    this.datasource = _datasourceFactory.getConsumer(
      this._dataformat,
      this._port,
      this._server,
      this._resource
    );
  }

  public getById(id: string): Observable<ProductModel> {
    return this.datasource.getByMethod<ProductModel>(`${id}`);
  }

  public getPage(
    pageableModel: PageableModel
  ): Observable<PageModel<ProductModel>> {
    pageableModel.sort = 'id';
    return this.datasource.getPageByMethod<ProductModel>(
      `getPage`,
      pageableModel
    );
  }
}
