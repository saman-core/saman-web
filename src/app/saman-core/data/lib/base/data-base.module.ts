import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DatasourceFactory } from './datasource/datasource.factory';
import { DATA_CONFIG, DataConfType } from './data.config';

@NgModule({ imports: [], providers: [DatasourceFactory, provideHttpClient(withInterceptorsFromDi())] })
export class DataBaseModule {
  static forRoot(config: DataConfType): ModuleWithProviders<DataBaseModule> {
    return {
      ngModule: DataBaseModule,
      providers: [
        {
          provide: DATA_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
