import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowEditorComponent } from '@saman-core/common';

const routes: Routes = [
  {
    path: '',
    component: WorkflowEditorComponent,
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
