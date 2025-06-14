import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DmnEditorModule, FormUtilModule } from '@saman-core/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AlertModule } from '@saman-core/core';
import { TemplateConditionsRoutingModule } from './template-conditions-routing.module';
import { TemplateConditionsComponent } from './template-conditions/template-conditions.component';
import { TemplateConditionDialogComponent } from './template-condition-dialog/template-condition-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { CommitDialogComponent } from './commit-dialog/commit-dialog.component';

@NgModule({
  imports: [
    FormUtilModule,
    TemplateConditionsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    DmnEditorModule,
    AlertModule,
    MatTreeModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSidenavModule,
    MatSelectModule,
  ],
  declarations: [
    TemplateConditionsComponent,
    TemplateConditionDialogComponent,
    DeleteDialogComponent,
    CommitDialogComponent,
  ],
})
export class TemplateConditionsModule {}
