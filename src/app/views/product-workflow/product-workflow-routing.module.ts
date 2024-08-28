import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductWorkflowComponent } from './product-workflow/product-workflow.component';

const routes: Routes = [
  {
    path: '',
    component: ProductWorkflowComponent,
    data: {
      title: $localize`Workflow`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductWorkflowRoutingModule {}
