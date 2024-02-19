import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateStructureComponent } from './template-structure/template-structure.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateStructureComponent,
    data: {
      title: 'Template Structure'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateStructureRoutingModule {
}
