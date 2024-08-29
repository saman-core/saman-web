import { NgModule } from '@angular/core';
import { WorkflowEditorModule } from '@saman-core/common';
import { ProductWorkflowRoutingModule } from './product-workflow-routing.module';
import { ProductWorkflowComponent } from './product-workflow/product-workflow.component';
import { TemplateBuilderModule } from '@saman-core/data';

@NgModule({
  declarations: [ProductWorkflowComponent],
  imports: [
    ProductWorkflowRoutingModule,
    WorkflowEditorModule,
    TemplateBuilderModule,
  ],
  providers: [],
  exports: [],
})
export class ProductWorkflowModule {}
