import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { PageModel, PageableModel } from '@saman-core/data';

@Injectable()
export class CdeRepository {
  constructor(private _datasourceFactory: DatasourceFactory) {}

  public getConsumer(productName: string, templateName: string): DatasourceConsumer {
    const dataformat = 'format1';
    const port = '9082';
    const server = `cde-${productName}-${templateName}`;
    const resource = '';

    return this._datasourceFactory.getConsumer(dataformat, port, server, resource);
  }

  public getPage(
    productName: string,
    templateName: string,
    pageableModel: PageableModel,
    params = {}
  ): Observable<PageModel<object>> {
    const consumer = this.getConsumer(productName, templateName);
    return consumer.getPageByMethod<object>('', pageableModel, params, true, true);
  }

  public getById(
    productName: string,
    templateName: string,
    id: number
  ): Observable<object> {
    const consumer = this.getConsumer(productName, templateName);
    return consumer.getByMethod<object>(`${id}`, {}, true, true);
  }

  public create(
    productName: string,
    templateName: string,
    data: object
  ): Observable<object> {
    const consumer = this.getConsumer(productName, templateName);
    return consumer.saveMethod<object, object>('', data, {}, true, true);
  }

  public update(
    productName: string,
    templateName: string,
    data: object
  ): Observable<object> {
    const consumer = this.getConsumer(productName, templateName);
    return consumer.updateMethod<object, object>('', data, {}, true, true);
  }
}
