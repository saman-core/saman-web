import { PageableModel } from '@saman-core/data';
import { HttpParams } from '@angular/common/http';

export class HeaderUtils {
  public static generateHeaders(
    blockScreen: boolean,
    progressBar: boolean,
    ignoreError: boolean,
  ): {
    headers: {
      ignoreBlockScreen: string;
      ignoreProgressBar: string;
      ignoreError: string;
      resourceType: string;
    };
  } {
    return {
      headers: {
        ignoreBlockScreen: blockScreen ? 'true' : 'false',
        ignoreProgressBar: progressBar ? 'true' : 'false',
        ignoreError: ignoreError ? 'true' : 'false',
        resourceType: 'api',
      },
    };
  }

  public static generateHttpParams(
    params: { [key: string]: string },
    pageableModel: PageableModel | null = null,
  ): HttpParams {
    let httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      httpParams = httpParams.set(key, value);
    }
    if (pageableModel !== null) {
      httpParams = httpParams
        .set('_page', pageableModel.page.toString())
        .set('_limit', pageableModel.size.toString())
        .set('_sort', pageableModel.sort.toString())
        .set('_order', pageableModel.order);
    }
    return httpParams;
  }
}
