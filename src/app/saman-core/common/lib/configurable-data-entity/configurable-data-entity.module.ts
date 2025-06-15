import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formio, FormioAppConfig, FormioModule } from '@formio/angular';
import { Templates } from '@formio/js';
import { FormioGrid } from '@formio/angular/grid';
import {
  CdeModule,
  ConditionTemplateModule,
  GenericResourcesModule,
  TemplateModule,
} from '@saman-core/data';
import { AlertModule } from '@saman-core/core';
import { FormUtilModule } from '../form-util/form-util.module';
import { CdeComponent } from './cde/cde.component';
import { CdeBuilderComponent } from './cde-builder/cde-builder.component';
import { InitCdeService } from './init.service';
import { template } from './template';
import { AppConfig } from './config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Formio as any).icons = 'fontawesome';
Templates.current = template;

@NgModule({
  declarations: [CdeComponent, CdeBuilderComponent],
  imports: [
    CommonModule,
    FormioModule,
    FormioGrid,
    TemplateModule,
    ConditionTemplateModule,
    GenericResourcesModule,
    CdeModule,
    FormUtilModule,
    AlertModule,
  ],
  providers: [InitCdeService, { provide: FormioAppConfig, useValue: AppConfig }],
  exports: [CdeComponent, CdeBuilderComponent],
})
export class ConfigurableDataEntityModule {}
