import { NgModule } from '@angular/core';
import { FormioAppConfig } from '@formio/angular';
import { AppConfig } from './config';

@NgModule({
  providers: [{ provide: FormioAppConfig, useValue: AppConfig }],
})
export class ConfigurableDataEntityModule {}
