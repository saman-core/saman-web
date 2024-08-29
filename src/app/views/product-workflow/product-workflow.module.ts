import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AlertModule } from '@saman-core/core';
import { WorkflowEditorModule } from '@saman-core/common';
import { ProductWorkflowRoutingModule } from './product-workflow-routing.module';
import { ProductWorkflowComponent } from './product-workflow/product-workflow.component';
import { TemplateBuilderModule } from '@saman-core/data';
import { CommitWorkflowDialogComponent } from './commit-workflow-dialog/commit-workflow-dialog.component';

@NgModule({
  declarations: [
    ProductWorkflowComponent,
    CommitWorkflowDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AlertModule,
    ProductWorkflowRoutingModule,
    WorkflowEditorModule,
    TemplateBuilderModule,
  ],
  providers: [],
  exports: [],
})
export class ProductWorkflowModule {}
