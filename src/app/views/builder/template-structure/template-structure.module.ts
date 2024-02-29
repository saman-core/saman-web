import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurableDataEntityModule } from '@saman-core/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TemplateStructureComponent } from './template-structure/template-structure.component';
import { TemplateStructureRoutingModule } from './template-structure-routing.module';
import { TemplateBuilderModule } from '@saman-core/data';
import { TemplateFormDialogComponent } from './template-form-dialog/template-form-dialog.component';
import { AlertModule } from '@saman-core/core';

@NgModule({
  imports: [
    TemplateStructureRoutingModule,
    CommonModule,
    MatExpansionModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ConfigurableDataEntityModule,
    TemplateBuilderModule,
    AlertModule,
  ],
  declarations: [
    TemplateStructureComponent,
    TemplateFormDialogComponent,
  ],
})
export class TemplateStructureModule {}
