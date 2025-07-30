import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasourceConsumer } from '../../../base/datasource/datasource.consumer';
import { DatasourceFactory } from '../../../base/datasource/datasource.factory';
import { PageModel, PageableModel } from '@saman-core/data';

@Injectable({
  providedIn: 'root',
})
export class CdeRepository {
  private readonly _datasourceFactory = inject(DatasourceFactory);

  public getConsumer(
    moduleName: string,
    productName: string,
    templateName: string,
  ): DatasourceConsumer {
    const dataformat = 'cde1';
    const port = '9082';
    const server = `${moduleName}-cde-${productName}-${templateName}`;
    const resource = '';

    return this._datasourceFactory.getConsumer(dataformat, port, server, resource);
  }

  public getPage(
    moduleName: string,
    productName: string,
    templateName: string,
    pageableModel: PageableModel,
    params = {},
  ): Observable<PageModel<object>> {
    const consumer = this.getConsumer(moduleName, productName, templateName);
    return consumer.getPageByMethod<object>('', pageableModel, params, true, true);
  }

  public getById(
    moduleName: string,
    productName: string,
    templateName: string,
    id: number,
  ): Observable<object> {
    const consumer = this.getConsumer(moduleName, productName, templateName);
    return consumer.getByMethod<object>(`${id}`, {}, true, true);
  }

  public create(
    moduleName: string,
    productName: string,
    templateName: string,
    data: object,
  ): Observable<object> {
    const consumer = this.getConsumer(moduleName, productName, templateName);
    return consumer.saveMethod<object, object>('', data, {}, true, true);
  }

  public update(
    moduleName: string,
    productName: string,
    templateName: string,
    data: object,
  ): Observable<object> {
    const consumer = this.getConsumer(moduleName, productName, templateName);
    return consumer.updateMethod<object, object>('', data, {}, true, true);
  }

  public delete(
    moduleName: string,
    productName: string,
    templateName: string,
    id: number,
  ): Observable<boolean> {
    const consumer = this.getConsumer(moduleName, productName, templateName);
    return consumer.deleteMethod<boolean>(`${id}`, {}, true, true);
  }
}
