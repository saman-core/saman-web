import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ConfigurableDataEntityModule } from '@saman-core/common';
import { TemplateStructureComponent } from './template-structure/template-structure.component';
import { TemplateStructureRoutingModule } from './template-structure-routing.module';
import { TemplateBuilderModule } from '@saman-core/data';

@NgModule({
  imports: [
    TemplateStructureRoutingModule,
    CommonModule,
    MatListModule,
    ReactiveFormsModule,
    ConfigurableDataEntityModule,
    TemplateBuilderModule,
  ],
  declarations: [TemplateStructureComponent],
})
export class TemplateStructureModule {}
