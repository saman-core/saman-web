import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurableDataEntityModule } from '@saman-core/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { TemplateStructureComponent } from './template-structure/template-structure.component';
import { TemplateStructureRoutingModule } from './template-structure-routing.module';
import { TemplateBuilderModule } from '@saman-core/data';

@NgModule({
  imports: [
    TemplateStructureRoutingModule,
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialog,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    ConfigurableDataEntityModule,
    TemplateBuilderModule,
  ],
  declarations: [TemplateStructureComponent],
})
export class TemplateStructureModule {}
