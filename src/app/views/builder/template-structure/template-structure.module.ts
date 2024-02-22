import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurableDataEntityModule } from '@saman-core/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
} from '@angular/material/dialog';
import { TemplateStructureComponent } from './template-structure/template-structure.component';
import { TemplateStructureRoutingModule } from './template-structure-routing.module';
import { TemplateBuilderModule } from '@saman-core/data';
import { TemplateFormDialogComponent } from './template-form-dialog/template-form-dialog.component';

@NgModule({
  imports: [
    TemplateStructureRoutingModule,
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ConfigurableDataEntityModule,
    TemplateBuilderModule,
  ],
  declarations: [
    TemplateStructureComponent,
    TemplateFormDialogComponent,
  ],
})
export class TemplateStructureModule {}
