import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurableDataEntityModule } from '@saman-core/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { TemplateStructureComponent } from './template-structure/template-structure.component';
import { TemplateStructureRoutingModule } from './template-structure-routing.module';
import { TemplateBuilderModule } from '@saman-core/data';
import { TemplateFormBuilderComponent } from './template-form-builder/template-form-builder.component';
import { CommitDialogComponent } from './commit-dialog/commit-dialog.component';
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
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    ConfigurableDataEntityModule.forRoot({
      baseUrl: 'http://localhost:8080',
      projectUrl: 'http://localhost:8080',
    }),
    TemplateBuilderModule,
    AlertModule,
  ],
  declarations: [TemplateStructureComponent, TemplateFormBuilderComponent, CommitDialogComponent],
})
export class TemplateStructureModule {}
