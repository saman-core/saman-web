import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formio, FormioModule, Templates } from '@formio/angular';
import { FormioGrid } from '@formio/angular/grid';
import { FormioResources } from '@formio/angular/resource';
import { ConditionTemplateModule, TemplateModule } from '@saman-core/data';
import { CdeComponent } from './cde/cde.component';
import { CdeBuilderComponent } from './cde-builder/cde-builder.component';
import { InitService } from './init.service';
import { template } from './template';
import { CDE_CONFIG, CdeConfig } from './cde.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Formio as any).icons = 'fontawesome';
Templates.current = template;

@NgModule({
  declarations: [
    CdeComponent,
    CdeBuilderComponent
  ],
  imports: [
    CommonModule,
    FormioModule,
    FormioGrid,
    TemplateModule,
    ConditionTemplateModule,
  ],
  providers: [
    InitService,
    FormioResources
  ],
  exports: [
    CdeComponent,
    CdeBuilderComponent
  ]
})
export class ConfigurableDataEntityModule {
  static forRoot(config: CdeConfig): ModuleWithProviders<ConfigurableDataEntityModule> {
      return {
          ngModule: ConfigurableDataEntityModule,
          providers: [
              {
                  provide: CDE_CONFIG,
                  useValue: config,
              },
          ]
      };
  }
}
