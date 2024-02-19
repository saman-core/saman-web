import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfigurableDataEntityModule } from '@saman-core/common';
import { TemplateStructureComponent } from './template-structure/template-structure.component';
import { TemplateStructureRoutingModule } from './template-structure-routing.module';

@NgModule({
  imports: [
    TemplateStructureRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ConfigurableDataEntityModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [TemplateStructureComponent],
})
export class TemplateStructureModule {}
