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
  private _server = 'product';
  private _actionUrl = 'products';

  constructor(private _datasourceFactory: DatasourceFactory) {
    this.datasource = _datasourceFactory.getConsumer(
      this._server,
      this._actionUrl
    );
  }

  public getById(id: number): Observable<ProductModel> {
    return this.datasource.getByMethod<ProductModel>(`getById/${id}`);
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
