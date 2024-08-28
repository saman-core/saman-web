import { NgModule } from '@angular/core';
import { WorkflowEditorModule } from '@saman-core/common';
import { ProductWorkflowRoutingModule } from './product-workflow-routing.module';
import { ProductWorkflowComponent } from './product-workflow/product-workflow.component';

@NgModule({
  declarations: [ProductWorkflowComponent],
  imports: [
    ProductWorkflowRoutingModule,
    WorkflowEditorModule,
  ],
  providers: [],
  exports: [],
})
export class ProductWorkflowModule {}
