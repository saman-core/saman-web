import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateConditionsComponent } from './template-conditions/template-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateConditionsComponent,
    data: {
      title: 'Template Conditions'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateConditionsRoutingModule {
}
