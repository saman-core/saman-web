import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DmnEditorModule } from '@saman-core/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TemplateBuilderModule } from '@saman-core/data';
import { AlertModule } from '@saman-core/core';
import { TemplateConditionsComponent } from './template-conditions/template-conditions.component';
import { TemplateConditionDialogComponent } from './template-condition-dialog/template-condition-dialog.component';
import { TemplateConditionsRoutingModule } from './template-conditions-routing.module';

@NgModule({
  imports: [
    TemplateConditionsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    DmnEditorModule,
    AlertModule,
    TemplateBuilderModule,
    MatTreeModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
  ],
  declarations: [
    TemplateConditionsComponent,
    TemplateConditionDialogComponent,
  ],
})
export class TemplateConditionsModule {}
