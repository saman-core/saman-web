import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DmnEditorModule } from '@saman-core/common';
import { TemplateConditionsComponent } from './template-conditions/template-conditions.component';
import { TemplateConditionsRoutingModule } from './template-conditions-routing.module';

@NgModule({
  imports: [
    TemplateConditionsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    DmnEditorModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [TemplateConditionsComponent],
})
export class TemplateConditionsModule {}
