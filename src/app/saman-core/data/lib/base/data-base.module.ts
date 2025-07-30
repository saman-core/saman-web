import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DATA_CONFIG, DataConfType } from './data.config';

@NgModule({
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
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
