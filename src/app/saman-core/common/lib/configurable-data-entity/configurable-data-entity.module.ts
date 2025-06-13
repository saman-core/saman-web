import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formio, FormioModule } from '@formio/angular';
import { FormioGrid } from '@formio/angular/grid';
import { FormioResources } from '@formio/angular/resource';
import { CdeModule, ConditionTemplateModule, GenericResourcesModule, TemplateModule } from '@saman-core/data';
import { AlertModule } from '@saman-core/core';
import { FormUtilModule } from '../form-util/form-util.module';
import { CdeComponent } from './cde/cde.component';
import { CdeBuilderComponent } from './cde-builder/cde-builder.component';
import { InitCdeService } from './init.service';
import { template } from './template';
import { Templates } from '@formio/js';

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
  providers: [InitCdeService, FormioResources],
  exports: [CdeComponent, CdeBuilderComponent],
})
export class ConfigurableDataEntityModule {}
