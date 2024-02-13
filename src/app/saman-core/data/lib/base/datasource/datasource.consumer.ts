import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageableModel } from '../pagination/pageable.model';
import { PageModel } from '../pagination/page.model';
import { HeaderUtils } from './common/header.utils';

export class DatasourceConsumer {
  constructor(
    private _http: HttpClient,
    private _url: string,
  ) {}

  getByMethod<T>(
    method: string,
    params: { [key: string]: string } = {},
    blockScreen: boolean = false,
    progressBar: boolean = true,
    ignoreError: boolean = false,
  ): Observable<T> {
    return this._http.get<T>(`${this._url}/${method}`, {
      headers: HeaderUtils.generateHeaders(blockScreen, progressBar, ignoreError).headers,
      params: HeaderUtils.generateHttpParams(params),
    });
  }

  getAllByMethod<T>(
    method: string,
    params: { [key: string]: string } = {},
    blockScreen: boolean = false,
    progressBar: boolean = true,
    ignoreError: boolean = false,
  ): Observable<T[]> {
    return this._http.get<T[]>(`${this._url}/${method}`, {
      headers: HeaderUtils.generateHeaders(blockScreen, progressBar, ignoreError).headers,
      params: HeaderUtils.generateHttpParams(params),
    });
  }

  getPageByMethod<T>(
    method: string,
    pageableModel: PageableModel,
    params: { [key: string]: string } = {},
    blockScreen: boolean = false,
    progressBar: boolean = true,
    ignoreError: boolean = false,
  ): Observable<PageModel<T>> {
    return this._http.get<PageModel<T>>(`${this._url}/${method}`, {
      headers: HeaderUtils.generateHeaders(blockScreen, progressBar, ignoreError).headers,
      params: HeaderUtils.generateHttpParams(params, pageableModel),
    });
  }

  saveMethod<T>(
    method: string,
    item: any,
    params: { [key: string]: string } = {},
    blockScreen: boolean = false,
    progressBar: boolean = true,
    ignoreError: boolean = false,
  ): Observable<T> {
    return this._http.post<T>(`${this._url}/${method}`, item, {
      headers: HeaderUtils.generateHeaders(blockScreen, progressBar, ignoreError).headers,
      params: HeaderUtils.generateHttpParams(params),
    });
  }

  savePageMethod<T>(
    method: string,
    item: any,
    pageableModel: PageableModel,
    params: { [key: string]: string } = {},
    blockScreen: boolean = false,
    progressBar: boolean = true,
    ignoreError: boolean = false,
  ): Observable<PageModel<T>> {
    return this._http.post<PageModel<T>>(`${this._url}/${method}`, item, {
      headers: HeaderUtils.generateHeaders(blockScreen, progressBar, ignoreError).headers,
      params: HeaderUtils.generateHttpParams(params, pageableModel),
    });
  }

  updateMethod<T>(
    method: string,
    item: any,
    params: { [key: string]: string } = {},
    blockScreen: boolean = false,
    progressBar: boolean = true,
    ignoreError: boolean = false,
  ): Observable<T> {
    return this._http.put<T>(`${this._url}/${method}`, item, {
      headers: HeaderUtils.generateHeaders(blockScreen, progressBar, ignoreError).headers,
      params: HeaderUtils.generateHttpParams(params),
    });
  }

  updatePageMethod<T>(
    method: string,
    item: any,
    pageableModel: PageableModel,
    params: { [key: string]: string } = {},
    blockScreen: boolean = false,
    progressBar: boolean = true,
    ignoreError: boolean = false,
  ): Observable<PageModel<T>> {
    return this._http.put<PageModel<T>>(`${this._url}/${method}`, item, {
      headers: HeaderUtils.generateHeaders(blockScreen, progressBar, ignoreError).headers,
      params: HeaderUtils.generateHttpParams(params, pageableModel),
    });
  }

  deleteMethod<T>(
    method: string,
    params: { [key: string]: string } = {},
    blockScreen: boolean = false,
    progressBar: boolean = true,
    ignoreError: boolean = false,
  ): Observable<T> {
    return this._http.delete<T>(`${this._url}/${method}`, {
      headers: HeaderUtils.generateHeaders(blockScreen, progressBar, ignoreError).headers,
      params: HeaderUtils.generateHttpParams(params),
    });
  }
}
