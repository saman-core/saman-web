import { PageableModel } from './pageable.model';
import { Observable } from 'rxjs';
import { PageModel } from './page.model';

export type PagingAndSortingRepositoryCall<T> = (
  pageableModel: PageableModel,
  ...args: string[] | number[]
) => Observable<PageModel<T>>;
