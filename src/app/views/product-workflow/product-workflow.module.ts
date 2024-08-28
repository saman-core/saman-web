import { NgModule } from '@angular/core';
import { WorkflowEditorModule } from '@saman-core/common';
import { ProductWorkflowRoutingModule } from './product-workflow-routing.module';

@NgModule({
  declarations: [],
  imports: [
    ProductWorkflowRoutingModule,
    WorkflowEditorModule,
  ],
  providers: [],
  exports: [],
})
export class ProductWorkflowModule {}
